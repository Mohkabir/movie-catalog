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
import { Watchlist } from 'src/dal/watchlist.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie) private repo: Repository<Movie>,
    @InjectRepository(Watchlist) private watchlistRepo: Repository<Watchlist>,
  ) {}

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

  async addWatchlist(idObj: number, user: User) {
    const watchlist = this.watchlistRepo.create({ movieId: idObj, user });
    try {
      await this.watchlistRepo.save(watchlist);
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong try again later..',
      );
    }
    return watchlist;
  }

  async find(): Promise<{ count: number; movie: MovieDto[] }> {
    const movie = await this.repo.find();
    return {
      count: movie.length,
      movie,
    };
  }

  async findOne(id: number): Promise<MovieDto> {
    const movie = await this.repo.findOne({ id: id });
    if (!movie) {
      throw new NotFoundException(`movie id is not available`);
    }
    return movie;
  }

  async remove(id: number): Promise<{ message: string }> {
    const res = await this.repo.delete({ id: id });
    if (res.affected === 0) {
      throw new NotFoundException(`Cannot delete unavailable id`);
    }
    return { message: 'success' };
  }

  async update(movieUpdateDto: MovieUpdateDto, id: number): Promise<MovieDto> {
    const movie = await this.findOne(id);
    const updated = Object.assign(movie, movieUpdateDto);
    console.log(updated, 'updated');
    await this.repo.save(updated);
    return updated;
  }
}
