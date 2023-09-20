import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
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
  @Exclude()
  password: string;

  @Column()
  role: string;

  @OneToMany((_type) => Movie, (movie) => movie.user)
  @JoinColumn()
  movie: Movie[];

  @OneToMany((_type) => Watchlist, (watchlist) => watchlist.user)
  @JoinColumn()
  watchlist: Movie[];
}
