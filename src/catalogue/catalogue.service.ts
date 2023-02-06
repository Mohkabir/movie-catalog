import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Catalogue } from './catalogue.entity';
import { async } from 'rxjs';
import { User } from 'src/user/user.entity';
import { MovieDto } from './dtos/create-movie.dto';
@Injectable()
export class CatalogueService {
  constructor(
    @InjectRepository(Catalogue) private repo: Repository<Catalogue>,
  ) {}

  async create(body) {
    const movie = this.repo.create({ ...body });
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

  async findOne(query): Promise<MovieDto> {
    const { id } = query;
    const movie = await this.repo.findOneBy({ id });
    if (!movie) {
      throw new NotFoundException(`movie with id ${id} is not available`);
    }
    return movie;
  }

  async remove(param): Promise<{ message: string }> {
    const { id } = param;
    const movie = this.findOne(id);
    if (!movie) {
      throw new NotFoundException(`Cannot delete unavailable id`);
    }
    await this.repo.remove(id);
    return { message: 'success' };
  }

  update(body, id) {
    console.log(body, id, 'update');
  }
}
