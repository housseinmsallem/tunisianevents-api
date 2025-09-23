import { Controller, Post, UploadedFile, Query } from '@nestjs/common';
import { MediaService } from './media.service';
import { UploadFileRequestDTO } from './dto/upload-media.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Organisation } from 'src/organisation/entities/organisation.entity';
import { User } from 'src/users/entities/user.entity';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadMedia(
    @UploadedFile() file: Express.Multer.File,
    @Query() data: UploadFileRequestDTO,
    @CurrentUser() user: Organisation | User,
  ) {
    return;
  }
}
