import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { DataSource, Repository } from 'typeorm';
import { Media } from './entities/media.entity';
import { Organisation } from 'src/organisation/entities/organisation.entity';
import { User } from 'src/users/entities/user.entity';
import { Event } from 'src/event/entities/event.entity';
@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
    private datasource: DataSource,
  ) {}
  async uploadMedia(file: Express.Multer.File, createMediaDto: CreateMediaDto) {
    let organisation = null;
    let user = null;
    let event = null;
    if (createMediaDto.organisationId) {
      organisation = await this.datasource.getRepository(Organisation).findOne({
        where: { id: createMediaDto.organisationId },
      });
      if (!organisation) {
        throw new Error('Organisation not found');
      }
    }
    if (createMediaDto.userId) {
      user = await this.datasource.getRepository(User).findOne({
        where: { id: createMediaDto.userId },
      });
      if (!user) {
        throw new Error('User not found');
      }
    }
    if (createMediaDto.eventId) {
      event = await this.datasource.getRepository(Event).findOne({
        where: { id: createMediaDto.eventId },
      });
      if (!event) {
        throw new Error('Event not found');
      }
    }
    const media = this.mediaRepository.create({
      ...createMediaDto,
      url: '/uploads/' + file.filename,
      organisation,
      event,
      user,
    });

    console.log(media);
    await this.mediaRepository.save(media);
    return {
      url: `/uploads/${file.filename}`,
      name: file.filename,
      mimetype: file.mimetype,
      size: file.size,
    };
  }
  deleteMedia() {}
}
