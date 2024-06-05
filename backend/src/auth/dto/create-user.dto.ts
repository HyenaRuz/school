import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { ERole } from '../../enums/roles.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'User12345678', description: 'User password' })
  @MinLength(6, { message: 'Password must be more than six characters' })
  password: string;

  @ApiProperty({ example: 'firstName', description: 'User first name' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'lastName', description: 'User lastName' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: '+380987785465', description: 'User phone' })
  @IsString()
  phone: string;

  @ApiProperty({ example: '1996.12.04', description: 'User birthday' })
  @IsDate()
  birthday: Date;
}
