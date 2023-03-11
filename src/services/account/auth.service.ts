import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dtos/create-user.dto';
import { UserRepository } from 'src/repository/user.repository';
import { UserRole } from 'src/enums';
import { User } from 'src/dal/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private Jwtservice: JwtService,
  ) {}

  async signUp(body): Promise<User> {
    const user = await this.userRepository.signUp(body);
    return user;
  }

  async signIn(body: SignInDto): Promise<{ token: string }> {
    const { email, password } = body;
    const user = await this.userRepository.findOne({
      email: email,
    });
    console.log(user, 'here2');
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

  logout() {
    return 'logged out';
  }
}
