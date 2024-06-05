import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Patch,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreateEventDto } from './dto/create-event.dto';
import { Roles } from '../decorators/roles.decorator';
import { ERole } from '../enums/roles.enum';
import { RolesGuard } from '../guards/roles.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Event } from '../entities/event.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-single-event')
  @Roles(ERole.teacher)
  @UseGuards(JwtAuthGuard, RolesGuard)
  createSingleEvent(@Req() req, @Body() createEventDto: CreateEventDto) {
    return this.eventsService.createSingleEvent(+req.user.id, createEventDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-events-for-month')
  @Roles(ERole.teacher)
  @UseGuards(JwtAuthGuard, RolesGuard)
  createEventsForMonth(@Req() req, @Body() body) {
    return this.eventsService.createEventsForMonth(
      +req.user.id,
      +body.dayOfWeek,
      body.date,
      +body.monthsAhead,
      +body.studentID,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('pagination')
  @UseGuards(JwtAuthGuard)
  async findAllWithPagination(
    @Req() req,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.eventsService.findAllPagination(+req.user.id, +page, +limit);
  }

  // @Get()
  // @UseGuards(JwtAuthGuard)
  // findAll(@Req() req) {
  //   return this.eventsService.findAll(+req.user.id);
  // }

  @UseGuards(JwtAuthGuard)
  @Get('all-events')
  @UseGuards(JwtAuthGuard)
  findAllEvents(@Req() req) {
    return this.eventsService.findAllEvents(+req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Find One By Id' })
  @ApiResponse({ status: 200, type: [Event] })
  @Roles(ERole.teacher)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    // console.log(updateEventDto);
    return this.eventsService.update(+id, updateEventDto);
  }

  @Cron(CronExpression.EVERY_DAY_AT_7AM)
  handleCron() {
    this.eventsService.updateEventsStatus();
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.eventsService.remove(+id);
  // }
}
