import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Put,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { filterEventDto } from './dto/filter-event.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}
  @Get()
  findSome(@Query('limit') limit: number) {
    return this.eventService.findSome(limit);
  }

  @Get('filtered')
  async findFilteredEvents(@Query() filterDto: filterEventDto) {
    return await this.eventService.findFilteredEvents(filterDto);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Get('analytics/overview')
  async getOverview() {
    const totalEvents = await this.eventService.countEvents();
    const categories = await this.eventService.countByCategory();
    const cities = await this.eventService.countByCity();
    return { totalEvents, categories, cities };
  }
  // @UseGuards(AuthGuard)
  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }
  // @UseGuards(AuthGuard)
  @Post('multiple')
  createMany(@Body() createEventDto: CreateEventDto[]) {
    return this.eventService.createMany(createEventDto);
  }
  // @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, updateEventDto);
  }
  //  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
