import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Movie } from './movie.entity';

@Entity()
export class Cinema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  location: string;

  // @ManyToMany(() => Movie, (movie) => movie.cinemas, {
  //   cascade: true,
  // })
  // movies: Movie[];
}
