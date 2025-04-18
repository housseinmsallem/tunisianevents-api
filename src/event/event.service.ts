import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Event } from './entities/event.entity';
import { filterEventDto } from './dto/filter-event.dto';
@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    private datasource: DataSource,
  ) {}
  create(createEventDto: CreateEventDto) {
    return this.eventRepository.save(createEventDto);
  }
  findAll() {
    return this.eventRepository.find();
  }
  findOne(id: number) {
    return this.eventRepository.findOneBy({ id });
  }
  update(id: number, updateEventDto: UpdateEventDto) {
    return this.eventRepository.update({ id }, updateEventDto);
  }
  remove(id: number) {
    return this.eventRepository.delete({ id });
  }
  async findFilteredEvents(filterDto: filterEventDto): Promise<Event[]> {
    const { location, type, dateAfter, sortBy } = filterDto;
    const query = this.datasource
      .getRepository(Event)
      .createQueryBuilder('event');
    if (location) {
      query.andWhere('event.location = :location', { location });
    }
    if (type) {
      query.andWhere('event.type = :type', { type });
    }
    if (dateAfter) {
      query.andWhere('event.date > :dateA', { dateAfter });
    }
    if (sortBy) {
      query.orderBy(`event.${sortBy} = :location`, sortBy);
    }
    return await query.getMany();
  }
}
