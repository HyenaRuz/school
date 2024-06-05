import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Base } from './base.entity';
import { Event } from './event.entity';
import { ERole } from '../enums/roles.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';

@Entity()
export class User extends Base {
  @ApiProperty({ example: 'user@gmail.com', description: 'User email' })
  @Column()
  email: string;

  @ApiProperty({ example: '+380987785465', description: 'User phone' })
  @Column()
  phone: string;

  @ApiProperty({ example: 'User12345678', description: 'User password' })
  @Column()
  @Exclude()
  password: string;

  @ApiProperty({ example: 'firstName', description: 'User first name' })
  @Column()
  firstName: string;

  @ApiProperty({ example: 'lastName', description: 'User lastName' })
  @Column()
  lastName: string;

  @ApiProperty({ example: '12.04.1996', description: 'User birthday' })
  @Column()
  birthday: Date;

  @ApiProperty({ example: 'ADMIN', description: 'User role' })
  @Column()
  role: ERole;

  @ApiProperty({ example: [Event], description: 'User events' })
  @ManyToMany(() => Event, { cascade: true })
  @JoinTable({ name: 'events' })
  events: Event[];

  @ManyToMany(() => User, { cascade: true })
  @JoinTable({ name: 'connection' })
  connections: User[];

  @ApiProperty({ example: 'Educations data', description: 'User educations' })
  @Column('jsonb', { nullable: true })
  educations: any[];

  @Column({ nullable: true })
  about: string;

  @Column({ nullable: true })
  activationToken: string;
}
