import { Tag } from 'src/tags/entities/tag.entity';

export class CreateEventDto {
  name: string;
  description: string;
  city: string;
  location: string;
  date: string;
  duration: string;
  organisation: string;
  category: string;
  tagIds: number[];
}
