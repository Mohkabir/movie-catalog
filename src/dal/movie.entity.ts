import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Cinema } from './cinema.entity';
import { User } from './user.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  photo: string;

  @Column()
  year: string;

  @Column()
  genre: string;

  @Column()
  director: string;

  @Column()
  stars: string;

  @Column()
  rates: string;

  @Column()
  votes: string;

  @Column()
  duration: string;

  @Column()
  gross: string;

  @Column()
  description: string;

  @ManyToOne((_type) => User, (user) => user.movie)
  user: User;

  // @Exclude({ toPlainOnly: true })

  //   @ManyToMany(() => Cinema, (cinema) => cinema.movies)
  //   cinemas: Cinema[];
}
