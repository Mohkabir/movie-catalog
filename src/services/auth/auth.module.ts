import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/dal/movie.entity';
import { User } from 'src/dal/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Movie]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'movieCatalogue',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, UserService],
  exports: [AuthService, JwtStrategy, PassportModule],
})
export class AuthModule {}
