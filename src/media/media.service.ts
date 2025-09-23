import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/upload-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Injectable()
export class MediaService {
  constructor() {}
  uploadMedia() {}
  deleteMedia() {}
}
