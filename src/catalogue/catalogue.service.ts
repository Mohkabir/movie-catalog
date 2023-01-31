import { Injectable } from '@nestjs/common';
import { MovieDto } from './dtos/create-movie.dto';

@Injectable()
export class CatalogueService {
  catalogue = [];

  create(body): MovieDto {
    console.log(body, 'create');
    this.catalogue.push(body);
    return body;
  }

  find() {
    return this.catalogue;
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
