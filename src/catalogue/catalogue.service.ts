import { Injectable } from '@nestjs/common';

@Injectable()
export class CatalogueService {
  create(body) {
    console.log(body, 'create');
  }

  find() {
    console.log('find');
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
