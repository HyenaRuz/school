import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../entities/event.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UsersModule } from '../users/users.module';
import { User } from '../entities/user.entity';
import { RolesGuard } from '../guards/roles.guard';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, User]),
    UsersModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [EventsController],
  providers: [EventsService, JwtAuthGuard, RolesGuard],
  exports: [EventsService],
})
export class EventsModule {}
