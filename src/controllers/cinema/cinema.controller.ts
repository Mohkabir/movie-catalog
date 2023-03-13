import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CinemaService } from 'src/services/cinema/cinema.service';
import { CinemaDto } from 'src/services/cinema/create-cinema.dto';
import { Cinema } from 'src/dal/cinema';
import { IsAdmin } from 'src/services/auth/custom-decorators/isAdmin.decorator';

@Controller('/cinema')
@UseGuards(AuthGuard())
export class CinemaController {
  constructor(private cinemaService: CinemaService) {}

  @Get('/')
  getCinema(): Promise<Cinema[]> {
    return this.cinemaService.getCinema();
  }

  @Post()
  createCinema(@Body() body: CinemaDto, @IsAdmin() isAdmin): Promise<Cinema> {
    return this.cinemaService.create(body);
  }

  @Patch('/:id')
  updateCinema(
    @IsAdmin() isAdmin,
    @Body() cinema: CinemaDto,
    @Param() param: object,
  ) {
    return this.cinemaService.update(cinema, param);
  }

  @Delete('/:id')
  deleteMovie(@IsAdmin() isAdmin, @Param() param: object) {
    return this.cinemaService.remove(param);
  }
}
