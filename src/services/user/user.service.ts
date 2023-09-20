import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/dal/user.entity';
import { UserDto } from '../auth/dtos/create-user.dto';
import { Movie } from 'src/dal/movie.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    @InjectRepository(Movie) private movieRepo: Repository<Movie>,
  ) {}

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
    // const user = await this.repo.findOne({ id: +id });

    const user = await this.repo
      .createQueryBuilder('user')
      .where({ id: +id })
      .leftJoinAndSelect('user.watchlist', 'watchlist')
      .leftJoinAndSelect('user.movie', 'movie')
      .select([
        'user',
        'movie.name',
        'movie.id',
        'watchlist.id',
        'watchlist.movieId',
      ])
      .getOne();

    //    .createQueryBuilder(table1, 't1')
    //   .select('t1.id', 't1_id')
    //   .addSelect('t2.id_2', 't2_id_2')
    //   .addSelect('t3.event', 't3_event')
    //   .addSelect('t4.column1', 't4_column1') // up to this point: SELECT t1.id,t2.id_2,t3.event,t3.column1,t4.column1 FROM table1 t1
    //   .innerJoin(table2, 't2', 't1.id = t2.id') //INNER JOIN table2 t2 ON t1.id = t2.id
    // .where('t3.event = 2019') // WHERE t3.event = 2019

    // const query = await this.repo
    //   .createQueryBuilder('user')
    //   .select([
    //     'user',
    //     'movie.name',
    //     'movie.id',
    //     'watchlist.id',
    //     'watchlist.movieId',
    //   ])
    //   .innerJoin(`${this.movieRepo}`, 'movie')
    //   .where({ id: +id });
    // this.logger.debug(query.getSql());
    // const user = await query.getOne();

    if (!user) {
      throw new NotFoundException(`user with id ${id} is not available`);
    }

    // movieRepo;
    return user;
  }
}
