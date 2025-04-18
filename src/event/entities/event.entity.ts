import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  city: string;
  @Column()
  location: string;
  @Column()
  date: string;
  @Column()
  duration: string;
  @Column()
  organisation: string;
  @Column()
  category: string;
}
