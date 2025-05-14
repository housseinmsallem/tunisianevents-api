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
  async findSome(count: number) {
    const query = this.datasource.getRepository(Event).createQueryBuilder();

    return await query.getMany();
  }
  async findFilteredEvents(filterDto: filterEventDto): Promise<Event[]> {
    const { name, location, city, type, dateAfter, sortBy } = filterDto;
    const query = this.datasource
      .getRepository(Event)
      .createQueryBuilder('event');
    if (name) {
      query.andWhere('event.name ILIKE :name', { name: `%${name}%` });
    }
    if (location) {
      query.andWhere('event.location = :location', { location });
    }
    if (city) {
      query.andWhere('event.city = :city', { city });
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
  async countEvents(): Promise<number> {
    return this.eventRepository.count();
  }

  async countByCategory(): Promise<any> {
    return this.eventRepository
      .createQueryBuilder('event')
      .select('event.category')
      .addSelect('COUNT(*)', 'count')
      .groupBy('event.category')
      .getRawMany();
  }

  async countByCity(): Promise<any> {
    return this.eventRepository
      .createQueryBuilder('event')
      .select('event.city')
      .addSelect('COUNT(*)', 'count')
      .groupBy('event.city')
      .getRawMany();
  }
}
