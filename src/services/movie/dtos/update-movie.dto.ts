import { IsString } from 'class-validator';

export class MovieUpdateDto {
  @IsString()
  name?: string;

  @IsString()
  photo?: string;

  @IsString()
  year?: string;

  @IsString()
  genre?: string;

  @IsString()
  director?: string;

  @IsString()
  description?: string;
}
