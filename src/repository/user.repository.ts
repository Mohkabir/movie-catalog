import { EntityRepository, Repository } from 'typeorm';
import { User } from 'src/dal/user.entity';
import {
  UnauthorizedException,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SignInDto } from 'src/services/account/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  //   constructor(private Jwtservice: JwtService) {}

  async signUp(body) {
    const { email, password, name, role } = body;
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);
    let user;
    try {
      user = this.create({
        email,
        password: hashed,
        name,
        role,
      });
    } catch (error) {
      console.log(error, 'error');
      throw new ConflictException('email already exist');
    }
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('email already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return user;
  }

  //   async signIn(body: SignInDto): Promise<{ token: string }> {
  //     const { email, password } = body;
  //     const user = await this.findOneBy({
  //       email: email,
  //     });

  //     if (user && (await bcrypt.compare(password, user.password))) {
  //       const payload = { email };
  //       const token: string = this.Jwtservice.sign(payload);
  //       return { token };
  //     } else {
  //       throw new UnauthorizedException('wrong credentials');
  //     }
  //   }

  //   async findByEmail(email: string): Promise<User> {
  //     const user = await this.findOneBy({ email });
  //     if (!user) {
  //       throw new UnauthorizedException('wrong credentials');
  //     }
  //     return user;
  //   }

  async findByEmail(email: string): Promise<User> {
    console.log(email, 'first');
    const user = await this.findOne({ email: email });
    console.log(user, 'res first');

    return user;
  }

  async createUser(body): Promise<any> {
    const user = await this.create(body);
    return user;
  }

  async saveUser(user): Promise<User> {
    const newUser = await this.save(user);
    return newUser;
  }
}
