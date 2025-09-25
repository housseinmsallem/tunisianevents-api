import { ApiProperty } from '@nestjs/swagger';

export class CreateMediaDto {
  type: string;
  userId?: number;
  organisationId?: number;
  eventId?: number;
}
