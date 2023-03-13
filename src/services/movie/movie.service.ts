import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieDto } from './dtos/create-movie.dto';
import { MovieUpdateDto } from './dtos/update-movie.dto';
import { Movie } from 'src/dal/movie.entity';
import { User } from 'src/dal/user.entity';

@Injectable()
export class MovieService {
  constructor(@InjectRepository(Movie) private repo: Repository<Movie>) {}

  async create(movieDto: MovieDto, user: User) {
    const movie = this.repo.create({ ...movieDto, user });
    await this.repo.save(movie);
    try {
      await this.repo.save(movie);
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong try again later..',
      );
    }
    return movie;
  }

  async find(): Promise<{ count: number; movie: MovieDto[] }> {
    const movie = await this.repo.find();
    return {
      count: movie.length,
      movie,
    };
  }

  async findOne(param: object): Promise<MovieDto> {
    const movie = await this.repo.findOne(param);
    if (!movie) {
      throw new NotFoundException(`movie id is not available`);
    }
    return movie;
  }

  async remove(id: object): Promise<{ message: string }> {
    const res = await this.repo.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`Cannot delete unavailable id`);
    }
    return { message: 'success' };
  }

  async update(movieUpdateDto: MovieUpdateDto, id: object): Promise<MovieDto> {
    const movie = await this.findOne(id);
    const updated = Object.assign(movie, movieUpdateDto);
    console.log(updated, 'updated');
    await this.repo.save(updated);
    return updated;
  }
}
