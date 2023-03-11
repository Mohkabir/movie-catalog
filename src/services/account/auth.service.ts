import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/dal/user.entity';
import { SignInDto, UserDto, UserRole } from './dtos/create-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private Jwtservice: JwtService,
    private userService: UserService,
  ) {}

  async signUp(body: UserDto): Promise<User> {
    const { email, password, name, role } = body;
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);
    const newUser = {
      email,
      password: hashed,
      name,
      role,
    };
    const user = this.userService.createUser(newUser);
    return user;
  }

  async signIn(body: SignInDto): Promise<{ token: string }> {
    const { email, password } = body;
    const user = await this.userService.getUserByEmail(email);
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
    return { msg: 'logged out' };
  }
}
