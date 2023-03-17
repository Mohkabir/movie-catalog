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
  time: string;

  @ManyToMany(() => Cinema, (cinema) => cinema.movies, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'cinema_id', referencedColumnName: 'id' }])
  cinemas: Cinema[];

  @ManyToMany(() => Movie, (movie) => movie.cinemas, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'movie_id', referencedColumnName: 'id' }])
  movies: Movie[];
}
