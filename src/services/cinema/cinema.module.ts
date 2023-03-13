import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CinemaController } from 'src/controllers/cinema/cinema.controller';
import { Cinema } from 'src/dal/cinema';
import { AuthModule } from '../auth/auth.module';
import { CinemaService } from './cinema.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cinema]), AuthModule],
  providers: [CinemaService, CinemaController],
  controllers: [CinemaController],
})
export class CinemaModule {}
