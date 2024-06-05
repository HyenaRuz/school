import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsDate,
  IsArray,
} from 'class-validator';
import { ERole } from '../../enums/roles.enum';

export class UpdateUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'User email' })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+380987785465', description: 'User phone' })
  @IsOptional()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ example: 'firstName', description: 'User first name' })
  @IsOptional()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'lastName', description: 'User lastName' })
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiProperty({ example: '12.04.1996', description: 'User birthday' })
  @IsOptional()
  @IsDate()
  birthday: Date;

  @ApiProperty({ example: 'ADMIN', description: 'User role' })
  @IsOptional()
  @IsString()
  role: ERole;

  @ApiProperty({ example: 'Educations data', description: 'User educations' })
  @IsOptional()
  @IsArray()
  educations: any[];

  @ApiProperty({ example: 'About data', description: 'User about information' })
  @IsOptional()
  @IsString()
  about: string;
}
