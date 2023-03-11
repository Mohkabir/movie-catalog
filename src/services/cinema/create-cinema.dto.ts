import { IsString } from 'class-validator';

export class CinemaDto {
  @IsString()
  name: string;

  @IsString()
  location: string;
}
