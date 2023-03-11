import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/dal/user.entity';
import { UserRepository } from 'src/repository/user.repository';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserRepository) private repo: UserRepository) {}

  async getMe(id: string): Promise<User> {
    const user = await this.repo.findOne({ id: +id });
    if (!user) {
      throw new NotFoundException(`user with id ${id} is not available`);
    }
    return user;
  }
}
