import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThan, Repository } from 'typeorm';
import { Event } from '../entities/event.entity';
import {
  addMonths,
  addWeeks,
  eachDayOfInterval,
  endOfMonth,
  fromUnixTime,
  getDay,
  getUnixTime,
} from 'date-fns';
import { EStatus } from '../enums/status.enum';
import { User } from '../entities/user.entity';
import { classToPlain, plainToClass } from 'class-transformer';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private userService: UsersService,
  ) {}

  async createSingleEvent(userId: number, createEventDto: CreateEventDto) {
    const { date, studentID } = createEventDto;

    if (studentID === userId || studentID) {
      new BadRequestException('invalid data');
    }

    const user = await this.userService.findOneById(userId);

    const addedUser = await this.userService.findOneById(studentID);

    const event = new Event();
    const startTime = new Date(date);
    // const timestamp = getUnixTime(startTime);

    const isAvailable = await this.isTimeSlotAvailable(userId, startTime);

    if (!isAvailable) {
      throw new BadRequestException('Time is already taken.');
    }

    event.date = startTime;
    event.status = EStatus.planned;
    event.student = addedUser;
    event.teacher = user;

    user.events.push(event);
    addedUser.events.push(event);

    await this.userRepository.save(user);
    await this.userRepository.save(addedUser);

    const plainEvent = classToPlain(event, { excludePrefixes: ['event'] });
    const eventInstance = plainToClass(Event, plainEvent);

    return eventInstance;
  }

  async createEventsForMonth(
    userId: number,
    dayOfWeek: number,
    date: string,
    monthsAhead: number,
    addedUserId: number,
  ) {
    const startDate = new Date(date);

    const startHours = startDate.getHours();
    const startMinutes = startDate.getMinutes();

    const endDate = addWeeks(endOfMonth(addMonths(startDate, monthsAhead)), 1);

    endDate.setHours(startHours);
    endDate.setMinutes(startMinutes);

    const daysInPeriod = eachDayOfInterval({ start: startDate, end: endDate });
    const events: Event[] = [];

    for (const date of daysInPeriod) {
      if (getDay(date) === dayOfWeek) {
        date.setHours(startHours);
        date.setMinutes(startMinutes);

        const createEventDto: CreateEventDto = {
          date: date.toString(),
          studentID: +addedUserId,
          status: EStatus.planned,
        };
        const event = await this.createSingleEvent(userId, createEventDto);
        events.push(event);
      }
    }

    return events;
  }

  async isTimeSlotAvailable(userId: number, date: Date) {
    const startTime = date;

    const endTime = new Date(startTime);
    endTime.setMinutes(startTime.getMinutes() + 59);

    const beforeStartTime = new Date(startTime);
    beforeStartTime.setMinutes(startTime.getMinutes() - 59);

    const events = await this.eventRepository.find({
      where: [
        {
          teacher: { id: userId },
          date: Between(startTime, endTime),
          status: EStatus.planned,
        },
        {
          teacher: { id: userId },
          date: Between(beforeStartTime, endTime),
          status: EStatus.planned,
        },
      ],
    });

    if (events.length > 0) {
      return false;
    }

    return true;
  }

  async findOne(id: number) {
    const event = await this.eventRepository.findOne({ where: { id: id } });

    if (!event) throw new NotFoundException('User not found');

    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const retrievedEvent = await this.eventRepository.findOne({
      relations: { student: true },
      where: { id: id },
    });

    if (!retrievedEvent) throw new NotFoundException('Event not found');

    if (updateEventDto.status !== EStatus.rescheduled) {
      delete updateEventDto.date;

      return await this.eventRepository.update(+id, updateEventDto);
    } else {
      const existingEvent = await this.eventRepository.findOneBy({
        date: new Date(updateEventDto.date),
      });

      if (existingEvent) {
        throw new BadRequestException('Time is already taken');
      }

      const update = await this.eventRepository.update(+id, {
        ...updateEventDto,
        rescheduled: retrievedEvent.date,
      });

      return update;
    }
  }

  async updateEventsStatus(): Promise<void> {
    const eventsToBeUpdated = await this.eventRepository.find({
      where: {
        status: EStatus.planned,
        date: LessThan(new Date()),
      },
    });

    for (const event of eventsToBeUpdated) {
      event.status = EStatus.missed;
      await this.eventRepository.save(event);
    }
  }

  // async findAll(id: number) {
  //   const event = await this.eventRepository.find({
  //     relations: { student: true },
  //     where: { teacher: { id: id } },
  //   });

  //   if (!event) throw new NotFoundException('User not found');

  //   return event;
  // }

  async findAllEvents(id: number) {
    const event = await this.eventRepository.find({
      relations: { student: true, teacher: true },
      where: [{ teacher: { id } }, { student: { id } }],
    });

    if (!event) throw new NotFoundException('User not found');

    return event;
  }

  async findAllPagination(id: number, page: number, limit: number) {
    const event = await this.eventRepository.find({
      relations: { student: true },
      where: { teacher: { id: id } },
      take: limit,
      skip: (page - 1) * limit,
    });

    if (!event) throw new NotFoundException('Event not found');

    return event;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
