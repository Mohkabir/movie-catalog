import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cinema } from 'src/dal/cinema.entity';
import { CinemaDto } from './create-cinema.dto';
import { MovieService } from '../movie/movie.service';
import { Movie } from 'src/dal/movie.entity';
import { CinemaMovie } from 'src/dal/cinema.movie.entity';

@Injectable()
export class CinemaService {
  private readonly logger = new Logger(CinemaService.name);
  constructor(
    @InjectRepository(Cinema) private repo: Repository<Cinema>,
    @InjectRepository(CinemaMovie)
    private cinemaMovieRepo: Repository<CinemaMovie>,
    private movie: MovieService,
  ) {}

  async create(newCinema: CinemaDto): Promise<Cinema> {
    const cinema = this.repo.create(newCinema);
    try {
      await this.repo.save(cinema);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Cinema already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return cinema;
  }

  async getCinema(): Promise<Cinema[]> {
    const cinema = await this.repo.find();
    return cinema;
  }

  async getCinemaById(id: number): Promise<any> {
    const cinema = await this.repo.findOne(id);
    if (!cinema) {
      throw new NotFoundException(`cinema with id ${id} is not available`);
    }

    const query = this.cinemaMovieRepo
      .createQueryBuilder('e')
      .andWhere(`e.cinemaId=${id}`, { id });

    this.logger.debug(query.getSql());

    const movies = await query.getMany();

    const response = {
      ...cinema,
      movies: movies.map((item) => {
        return {
          movie: item.movieId,
          date_time: item.date_time,
        };
      }),
    };
    return response;
  }

  async update(updatedCinema: CinemaDto, param: any): Promise<Cinema> {
    const { id } = param;
    const cinema = await this.repo.findOne({ id: +id });
    const updated = Object.assign(cinema, updatedCinema);
    await this.repo.save(updated);
    return updated;
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.cinemaMovieRepo.delete({ cinemaId: id });
    const res = await this.repo.delete(id);

    if (res.affected === 0) {
      throw new NotFoundException(`Cannot delete unavailable id`);
    }
    return { message: 'success' };
  }

  async addMovie(movieInfo, param): Promise<any> {
    let res;
    try {
      res = await this.cinemaMovieRepo.save({
        movieId: movieInfo.id,
        cinemaId: +param.id,
        date_time: movieInfo.date_time,
      });
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new BadRequestException(
          'Duplicate error: Cinema in same location cant show one movie same time',
        );
      }
      if (error.code === '23502') {
        throw new BadRequestException('All feild are requred');
      }
      throw new InternalServerErrorException();
    }
    const cinema = await this.getCinemaById(res.cinemaId);
    // const movie = await this.movie.findOne(res.movieId);
    return cinema;
  }
}
