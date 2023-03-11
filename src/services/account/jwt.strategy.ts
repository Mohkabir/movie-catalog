import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from 'src/repository/user.repository';
import { User } from '../../dal/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private userService: UserService,
  ) {
    super({
      secretOrKey: 'movieCatalogue',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: { email: string }): Promise<User> {
    const { email } = payload;
    const user = await this.userRepository.findOne({ email: email });
    console.log(user, 'heree');
    if (!user) {
      throw new UnauthorizedException('Kindly Login to access routes');
    }
    return user;
  }
}
