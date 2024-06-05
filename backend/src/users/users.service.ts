import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { ILike, Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ERole } from '../enums/roles.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { IEducation } from '../types/types';
import { CreateUserDto } from '../auth/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(userData: CreateUserDto, role: ERole) {
    const { password, activationToken, ...user } =
      await this.userRepository.save({
        ...userData,
        password: await bcrypt.hash(userData.password, 10),
        activationToken: await bcrypt.hash(userData.email, 10),
        role: role,
      });

    return user;
  }

  async searchUsers(keyword: string, role: ERole): Promise<User[]> {
    return this.userRepository.find({
      where: [
        { firstName: ILike(`%${keyword}%`), role: Not(role) },
        { lastName: ILike(`%${keyword}%`), role: Not(role) },
      ],
    });
  }

  async findAllByRolesPagination(role: ERole, page: number, limit: number) {
    const [users, total] = await this.userRepository.findAndCount({
      where: { role: role },
      relations: { events: true, connections: true },
      take: limit,
      skip: (page - 1) * limit,
    });
    return { users, total };
  }

  async findAllByRoles(role: ERole) {
    const user = await this.userRepository.find({
      where: { role: role },
      relations: { events: true },
    });
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async findOneById(id: number) {
    if (id === null || id === undefined) {
      throw new BadRequestException('ID cannot be null or undefined');
    }

    const parsedId = Number(id);

    if (!Number.isInteger(parsedId) || parsedId <= 0) {
      throw new BadRequestException('ID must be a positive integer');
    }

    const user = await this.userRepository.findOne({
      relations: ['connections', 'events'],
      where: { id: parsedId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findOneByActivationToken(token: string) {
    // console.log(token);

    const user = await this.userRepository.findOne({
      relations: ['connections'],
      where: { activationToken: token },
    });

    // console.log(user);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async createConnection(role: string, userID: number, addedUserID: number) {
    const addedUser = await this.findOneById(addedUserID);
    const user = await this.findOneById(userID);

    if (role === addedUser.role) {
      throw new BadRequestException(
        `there can be no connection between ${role} and ${addedUser.role}`,
      );
    }

    const connectionExists = user.connections?.some((connection) => {
      return role === ERole.student || role === ERole.teacher
        ? connection.id === addedUser.id
        : connection.id === user.id;
    });

    if (connectionExists) {
      throw new BadRequestException('The connection already exists');
    }

    user.connections.push(addedUser);
    addedUser.connections.push(user);

    await this.userRepository.save(addedUser);
    await this.userRepository.save(user);

    return this.findOneById(user.id);
  }

  async deleteConnection(userID: number, deletedUserID: number) {
    const deletedUser = await this.findOneById(deletedUserID);
    const user = await this.findOneById(userID);

    const connectionExists = user.connections.some(
      (connection) => connection.id === deletedUser.id,
    );

    if (!connectionExists) {
      throw new BadRequestException('Connection does not exist');
    }

    user.connections = user.connections.filter(
      (connection) => connection.id !== deletedUser.id,
    );
    deletedUser.connections = deletedUser.connections.filter(
      (connection) => connection.id !== user.id,
    );

    await this.userRepository.save(user);
    await this.userRepository.save(deletedUser);

    return { message: 'Connection deleted successfully' };
  }

  async allStudent(userID: number) {
    const user = await this.findOneById(userID);
    const student = user.connections.filter(
      (connections) => connections.role === ERole.student,
    );

    return student;
  }

  async allTeacher(userID: number) {
    const user = await this.findOneById(userID);
    const teacher = user.connections.filter(
      (connections) => connections.role === ERole.teacher,
    );

    return teacher;
  }

  async allConnections(userID: number) {
    const user = await this.findOneById(userID);

    return user.connections;
  }

  async updateUser(userID: number, data: UpdateUserDto) {
    await this.findOneById(userID);
    return await this.userRepository.update(userID, data);
  }

  isValidEducation(education: any): education is IEducation {
    return (
      typeof education.city === 'string' &&
      typeof education.year === 'string' &&
      typeof education.degree === 'string' &&
      typeof education.university === 'string'
    );
  }

  async createUserEducation(userId: number, educations: IEducation) {
    const user = await this.findOneById(userId);

    if (!user.educations) {
      user.educations = [];
    }

    if (!this.isValidEducation(educations)) {
      throw new BadRequestException('Invalid education object');
    }

    user.educations.push(educations);
    return this.userRepository.save(user);
  }

  async updateUserEducation(
    userId: number,
    education: IEducation,
    index: number,
  ) {
    const user = await this.findOneById(userId);

    if (!user.educations) {
      throw new BadRequestException('educations not found');
    }

    if (!this.isValidEducation(education)) {
      throw new BadRequestException('Invalid education object');
    }

    if (index >= 0 && index < user.educations.length) {
      user.educations[index] = education;
    } else {
      throw new BadRequestException('Invalid education index');
    }

    return await this.userRepository.save(user);
  }
}
