import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieDto } from './dtos/create-movie.dto';
import { MovieUpdateDto } from './dtos/update-movie.dto';
import { Movie } from 'src/dal/movie.entity';
import { MovieRepository } from 'src/repository/movie.repository';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieRepository)
    private repo: MovieRepository,
  ) {}

  async create(movieDto: MovieDto) {
    const movie = this.repo.create({ ...movieDto });
    await this.repo.save(movie);
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
    const movie = await this.repo.findOneBy(param);
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
