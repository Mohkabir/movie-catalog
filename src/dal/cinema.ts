import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cinema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  location: string;
}
