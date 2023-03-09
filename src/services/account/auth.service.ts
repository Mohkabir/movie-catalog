import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/dal/user.entity';
import { SignInDto } from './dtos/create-user.dto';
import { UserRepository } from 'src/repository/user.repository';
import { UserRole } from 'src/enums';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private repo: UserRepository,
    private Jwtservice: JwtService,
  ) {}

  async signUp(body) {
    const { email, password, name, role } = body;
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

  isAdmin(req) {
    if (req.user.role !== UserRole.ADMIN) {
      throw new UnauthorizedException(
        `user with role ${req.user.role} is Unauthorized`,
      );
    }
  }
}