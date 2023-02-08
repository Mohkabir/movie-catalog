import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
