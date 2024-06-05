import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { EStatus } from '../../enums/status.enum';

export class CreateEventDto {
  @ApiProperty({ example: '2024-02-05 04:00', description: 'Event date' })
  @IsString()
  date: string;

  @ApiProperty({ example: 'planned', description: 'Event status' })
  @IsEnum(EStatus)
  status: EStatus;

  @ApiProperty({ example: '1', description: 'Event student id' })
  @IsNumber()
  studentID: number;
}
