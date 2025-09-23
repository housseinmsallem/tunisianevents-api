import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
export enum AccessType {
    PRIVATE = 'private',
    PUBLIC_READ = 'public-read'
}
export enum MediaType {
  IMAGE,
  VIDEO,
  DOCUMENT,
  ARCHIVE,
  OTHER,
}
export class UploadFileRequestDTO {
  @ApiProperty({ enum: MediaType })
  @IsEnum(MediaType)
  mediaType: MediaType;

  @ApiProperty({ enum: AccessType })
  @IsEnum(AccessType)
  accessType: AccessType;
}
