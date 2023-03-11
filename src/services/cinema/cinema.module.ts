import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CinemaController } from 'src/controllers/cinema/cinema.controller';
import { Cinema } from 'src/dal/cinema';
import { AuthModule } from '../account/auth.module';
import { CinemaService } from './cinema.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cinema]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
  ],
  providers: [CinemaService, CinemaController],
  controllers: [CinemaController],
})
export class CinemaModule {}
