import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
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

  @ManyToOne((_type) => User, (user) => user.movies, { eager: false })
  user: User;
}
