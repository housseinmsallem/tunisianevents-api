export class filterEventDto {
  name?: string;
  location?: string;
  city?: string;
  type?: string;
  dateAfter?: string;
  sortBy?: 'ASC' | 'DESC';
  minPrice?: number;
  maxPrice?: number;
}
