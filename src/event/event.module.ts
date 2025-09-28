import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Tag } from 'src/tags/entities/tag.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Event, Tag])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
