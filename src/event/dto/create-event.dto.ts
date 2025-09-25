export class CreateEventDto {
  name: string;
  description: string;
  city: string;
  location: string;
  date: string;
  duration: string;
  organisation: string;
  category: string;
  tags?: string[];
}
