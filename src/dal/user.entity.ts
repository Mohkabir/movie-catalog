import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Movie } from './movie.entity';

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
  movies: Movie[];
}
