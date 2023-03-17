import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Movie } from './movie.entity';
import { Watchlist } from './watchlist.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToMany((_type) => Movie, (movie) => movie.user, { eager: true })
  @Exclude({ toPlainOnly: true })
  movies: Movie[];

  @OneToMany((_type) => Watchlist, (watchlist) => watchlist.user, {
    eager: true,
  })
  watchlist: Movie[];
}
