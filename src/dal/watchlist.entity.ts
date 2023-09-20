import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Watchlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  movieId: number;

  @ManyToOne((_type) => User, (user) => user.watchlist)
  user: User;
}
