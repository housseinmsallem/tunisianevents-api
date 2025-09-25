import {
  Controller,
  Post,
  UploadedFile,
  Query,
  Req,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Organisation } from 'src/organisation/entities/organisation.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateMediaDto } from './dto/create-media.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Folder where files are stored
        filename: (req, file, callback) => {
          // Generate unique filename: <timestamp>-<random>.<ext>
          const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
          callback(null, uniqueName);
        },
      }),
    }),
  )
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Media Upload',
    type: CreateMediaDto,
  })
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() createMediaDto: CreateMediaDto,
  ) {
    // Save metadata in DB later
    return this.mediaService.uploadMedia(file, createMediaDto);
  }
}
