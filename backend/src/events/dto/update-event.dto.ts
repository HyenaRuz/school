import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { EStatus } from '../../enums/status.enum';

export class UpdateEventDto {
  @ApiProperty({ example: '2024-02-05 04:00', description: 'Event date' })
  @IsString()
  date: string;

  @ApiProperty({ example: 'planned', description: 'Event status' })
  @IsEnum(EStatus)
  status: EStatus;

  @IsString()
  topic: string;

  @IsString()
  homework: string;

  @IsString()
  bookLink: string;
}
