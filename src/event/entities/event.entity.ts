import { Media } from 'src/media/entities/media.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ nullable: true })
  description: string;
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
  @Column({ nullable: true })
  price: number;
  @OneToMany(() => Media, (media) => media.event)
  media: Media[];
}
