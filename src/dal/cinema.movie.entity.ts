import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm';
import { Cinema } from './cinema.entity';
import { Movie } from './movie.entity';

@Entity()
export class CinemaMovie {
  @PrimaryColumn({ name: 'cinema_id' })
  cinemaId: number;

  @PrimaryColumn({ name: 'movie_id' })
  movieId: number;

  @PrimaryColumn()
  date_time: Date;
}
