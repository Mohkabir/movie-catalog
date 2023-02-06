import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { SignInDto, UserDto, UserRole } from './dtos/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private Jwtservice: JwtService,
  ) {}

  async signUp(body) {
    const { email, password, name } = body;
    const role = UserRole.CUSTOMER;
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);
    const user = this.repo.create({ email, password: hashed, name, role });
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

  async signIn(body: SignInDto): Promise<{ token: string }> {
    const { email, password } = body;
    const user = await this.repo.findOneBy({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email };
      const token: string = this.Jwtservice.sign(payload);
      return { token };
    } else {
      throw new UnauthorizedException('wrong credentials');
    }
  }

  async find() {
    const user = await this.repo.find();
    return {
      count: user.length,
      users: user,
    };
  }
}
