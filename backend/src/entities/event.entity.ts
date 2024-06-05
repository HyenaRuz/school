import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from './base.entity';
import { User } from './user.entity';
import { EStatus } from '../enums/status.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Event extends Base {
  @ApiProperty({ example: '12.04.2024', description: 'Event date' })
  @Column({ type: 'timestamptz' })
  date: Date;

  @Column({ type: 'timestamptz', nullable: true })
  rescheduled: Date;

  @ApiProperty({ example: 'planned', description: 'Event status' })
  @Column()
  status: EStatus;

  @ApiProperty({ example: '1', description: 'Event student id' })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'student_id' })
  student: User;

  @ApiProperty({ example: '2', description: 'Event teacher id' })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'teacher_id' })
  teacher: User;

  @Column({ nullable: true })
  topic: string;

  @Column({ nullable: true })
  homework: string;

  @Column({ nullable: true })
  bookLink: string;

  @Column({ nullable: true })
  lessonСontent: string;
}
