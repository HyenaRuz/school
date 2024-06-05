import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { ERole } from '../enums/roles.enum';
import { RolesGuard } from '../guards/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { IEducation } from '../types/types';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'create Connections' })
  @ApiResponse({ status: 200, type: [User] })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('connections')
  createConnections(@Req() req, @Body() body) {
    return this.userService.createConnection(
      req.user.role,
      +req.user.id,
      +body.id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('connections')
  allConnections(@Req() req) {
    return this.userService.allConnections(+req.user.id);
  }

  @ApiOperation({ summary: 'delete Connections' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Roles(ERole.teacher)
  @UseGuards(JwtAuthGuard)
  @Delete('delete-connection/:id')
  async deleteConnection(@Req() req, @Param('id') deletedUserId: number) {
    await this.userService.deleteConnection(+req.user.id, +deletedUserId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Find One By Id' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('user/:id')
  findOneById(@Param('id') id: string) {
    return this.userService.findOneById(+id);
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Get('my-students')
  // @Roles(ERole.teacher)
  // allMyStudents(@Req() req) {
  //   return this.userService.allStudent(+req.user.id);
  // }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Get('myTeacher')
  // @Roles(ERole.student)
  // allMyTeachers(@Req() req) {
  //   return this.userService.allTeacher(+req.user.id);
  // }

  @UseGuards(JwtAuthGuard)
  @Get('students')
  allStudents(@Query('page') page: number, @Query('limit') limit: number) {
    return this.userService.findAllByRolesPagination(
      ERole.student,
      +page,
      +limit,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('teacher')
  allTeacher(@Query('page') page: number, @Query('limit') limit: number) {
    return this.userService.findAllByRolesPagination(
      ERole.teacher,
      +page,
      +limit,
    );
  }

  @Get('search')
  async searchUsers(
    @Query('keyword') keyword: string,
    @Query('role') role: string,
  ): Promise<User[]> {
    return this.userService.searchUsers(keyword, role as ERole);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.teacher)
  @Post('educations')
  async createUserEducation(@Req() req, @Body() educations: IEducation) {
    return this.userService.createUserEducation(+req.user.id, educations);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.teacher)
  @Patch('educations/:index')
  async updateUserEducation(
    @Req() req,
    @Param('index') index: string,
    @Body() educations: IEducation,
  ) {
    return this.userService.updateUserEducation(
      +req.user.id,
      educations,
      +index,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update')
  async updateUser(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+req.user.id, updateUserDto);
  }

  @Get('findOneByActivationToken/:token')
  async findOneByActivationToken(@Param('token') token: string) {
    return await this.userService.findOneByActivationToken(token);
  }
}
