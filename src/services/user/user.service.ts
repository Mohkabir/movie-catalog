import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/dal/user.entity';
import { UserDto } from '../auth/dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async createUser(newUser: UserDto): Promise<User> {
    const user = this.repo.create(newUser);
    try {
      await this.repo.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('email already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.repo.findOne({ email: email });
    return user;
  }

  async getMe(id: string): Promise<User> {
    const user = await this.repo.findOne({ id: +id });
    if (!user) {
      throw new NotFoundException(`user with id ${id} is not available`);
    }
    return user;
  }
}
