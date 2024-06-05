import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('AuthUser')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Signup user' })
  @ApiResponse({ status: 200, type: User })
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('signupStudent/:token')
  async signUpStudent(
    @Body() createUserDto: CreateUserDto,
    @Param('token') token: string,
  ) {
    return this.authService.signUpStudent(createUserDto, token);
  }

  @ApiOperation({ summary: 'Signin user' })
  @ApiResponse({ status: 200, type: User })
  @Post('signin')
  async signIn(@Body() body) {
    return this.authService.signIn(body);
  }

  @Post('refresh-tokens')
  async refreshTokens(@Body() body: { refreshToken: string }) {
    const refreshToken = body.refreshToken;
    if (!refreshToken) {
      throw new BadRequestException('Refresh token is not provided');
    }
    return this.authService.refreshTokens(refreshToken);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    return this.authService.getProfile(+req.user.id);
  }
}
