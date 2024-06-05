import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ERole } from '../enums/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const existUser = await this.userService.findOneByEmail(
      createUserDto.email,
    );

    if (existUser) throw new BadRequestException('This email already taken');

    const user = await this.userService.create(createUserDto, ERole.teacher);

    const tokens = await this.getTokens(user.id, user.email, user.role);

    return { ...user, ...tokens };
  }

  async signUpStudent(createUserDto: CreateUserDto, token: string) {
    const existUser = await this.userService.findOneByEmail(
      createUserDto.email,
    );

    if (existUser) throw new BadRequestException('This email already taken');

    const user = await this.userService.create(createUserDto, ERole.student);

    const tokens = await this.getTokens(user.id, user.email, user.role);

    const teacher = await this.userService.findOneByActivationToken(token);

    await this.userService.createConnection(ERole.student, user.id, teacher.id);

    return { ...user, ...tokens };
  }

  async signIn(data: { email: string; password: string }) {
    if (data.email === undefined || data.password === undefined) {
      throw new BadRequestException('Incorrect data');
    }

    const { email, password } = data;

    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('Incorrect data');
    }

    const { password: passwordHash, ...userData } = user;

    const passswordIsMatch = await bcrypt.compare(password, passwordHash);

    if (!passswordIsMatch) {
      throw new NotFoundException('Incorrect data');
    }

    const tokens = await this.getTokens(userData.id, email, userData.role);

    return { ...userData, ...tokens };
  }

  async getTokens(userId: number, email: string, role: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          email,
          role,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
          ),
        },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          email,
          role,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
          ),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(refreshToken: string) {
    try {
      const res = await this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      });
      return this.getTokens(res.id, res.email, res.role);
    } catch (err) {
      throw new BadRequestException('Refresh token was expired');
    }
  }
  async getProfile(userId: number) {
    const user = await this.userService.findOneById(+userId);

    const { password, events, connections, ...otherValues } = user;

    return otherValues;
  }
}
