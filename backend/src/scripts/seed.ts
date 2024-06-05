import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { Connection } from 'typeorm';
import { User } from '../entities/user.entity';
import { Event } from '../entities/event.entity';
import { ERole } from '../enums/roles.enum';
import { EStatus } from '../enums/status.enum';
import * as bcrypt from 'bcrypt';

function getRandomDateTime() {
  const startHour = 9;
  const endHour = 19;

  const date = new Date();
  const dayOffset = Math.floor(Math.random() * 7);
  date.setDate(date.getDate() + dayOffset);

  const hour = Math.floor(Math.random() * (endHour - startHour)) + startHour;
  const minute = Math.floor(Math.random() * 60);

  date.setHours(hour, minute, 0, 0);
  return date;
}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const connection = app.get(Connection);

  const userRepository = connection.getRepository(User);
  const eventRepository = connection.getRepository(Event);

  const teachers = [];
  for (let i = 1; i <= 2; i++) {
    const teacher = new User();
    teacher.email = `teacher${i}@example.com`;
    teacher.password = await bcrypt.hash('password', 10);
    teacher.role = ERole.teacher;
    teacher.firstName = `Teacher${i}`;
    teacher.lastName = `Lastname${i}`;
    teacher.birthday = new Date();
    teacher.phone = `+1234567890${i}`;
    teacher.activationToken = await bcrypt.hash(`teacher${i}@example.com`, 10);
    teacher.connections = [];
    teacher.events = [];
    teachers.push(await userRepository.save(teacher));
  }

  for (let i = 1; i <= 5; i++) {
    for (const teacher of teachers) {
      const student = new User();
      student.email = `student${teacher.id}_${i}@example.com`;
      student.password = await bcrypt.hash('password', 10);
      student.role = ERole.student;
      student.firstName = `Student${teacher.id}_${i}`;
      student.lastName = `Lastname${teacher.id}_${i}`;
      student.birthday = new Date();
      student.phone = `+0987654321${i}`;
      student.connections = [];
      student.events = [];
      const savedStudent = await userRepository.save(student);

      teacher.connections.push(savedStudent);
      savedStudent.connections.push(teacher);

      for (let j = 1; j <= 4; j++) {
        const event = new Event();
        event.date = getRandomDateTime();
        event.status = EStatus.planned;
        event.student = savedStudent;
        event.teacher = teacher;
        event.topic = `Lesson ${j}`;
        const savedEvent = await eventRepository.save(event);

        teacher.events.push(savedEvent);
        savedStudent.events.push(savedEvent);
      }

      await userRepository.save(teacher);
      await userRepository.save(savedStudent);
    }
  }

  await app.close();
}

bootstrap().catch((err) => console.error(err));
