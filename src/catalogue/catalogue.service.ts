import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Catalogue } from './catalogue.entity';
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

  async find() {
    const movie = await this.repo.find();
    return {
      count: movie.length,
      movie,
    };
  }

  findOne(id) {
    console.log(id, 'findOne');
  }

  remove(id) {
    console.log(id, 'remove');
  }

  update(body, id) {
    console.log(body, id, 'update');
  }
}
