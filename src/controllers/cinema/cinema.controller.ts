import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/services/user/user.service';
import { User } from 'src/dal/user.entity';
import { CinemaService } from 'src/services/cinema/cinema.service';
import { CinemaDto } from 'src/services/cinema/create-cinema.dto';
import { Cinema } from 'src/dal/cinema';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('/cinema')
@UseGuards(AuthGuard())
export class CinemaController {
  constructor(
    private cinemaService: CinemaService,
    private authService: AuthService,
  ) {}

  @Get('/')
  getCinema(): Promise<Cinema[]> {
    return this.cinemaService.getCinema();
  }

  @Post()
  createCinema(@Body() body: CinemaDto, @Req() req): Promise<Cinema> {
    this.authService.isAdmin(req);
    return this.cinemaService.create(body);
  }

  @Patch('/:id')
  updateCinema(@Req() req, @Body() cinema: CinemaDto, @Param() param: object) {
    this.authService.isAdmin(req);
    return this.cinemaService.update(cinema, param);
  }

  @Delete('/:id')
  deleteMovie(@Req() req, @Param() param: object) {
    this.authService.isAdmin(req);
    return this.cinemaService.remove(param);
  }
}
