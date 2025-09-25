import { Organisation } from 'src/organisation/entities/organisation.entity';
import { User } from 'src/users/entities/user.entity';
import { Event } from 'src/event/entities/event.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  type: string; // 'image', 'video', 'profile', etc.

  @ManyToOne(() => User, (user) => user.media, { nullable: true })
  user?: User;

  @ManyToOne(() => Organisation, (org) => org.media, { nullable: true })
  organisation?: Organisation;

  @ManyToOne(() => Event, (event) => event.media, { nullable: true })
  event?: Event;
}
