import { IsString } from 'class-validator';

export class MovieDto {
  @IsString()
  name: string;

  @IsString()
  photo: string;

  @IsString()
  year: string;

  @IsString()
  genre: string;

  @IsString()
  director: string;

  @IsString()
  stars: string;

  @IsString()
  rates: string;

  @IsString()
  votes: string;

  @IsString()
  duration: string;

  @IsString()
  gross: string;

  @IsString()
  description: string;
}
