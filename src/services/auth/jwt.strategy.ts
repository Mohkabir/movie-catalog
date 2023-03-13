import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../dal/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      secretOrKey: 'movieCatalogue',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: { email: string }): Promise<User> {
    const { email } = payload;
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Kindly Login to access routes');
    }
    return user;
  }
}
