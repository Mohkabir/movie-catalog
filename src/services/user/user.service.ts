import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/dal/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async getMe(id: string): Promise<User> {
    const user = await this.repo.findOneBy({ id: +id });
    if (!user) {
      throw new NotFoundException(`user with id ${id} is not available`);
    }
    return user;
  }
}
