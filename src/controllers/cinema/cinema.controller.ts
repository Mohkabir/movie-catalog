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
import { Cinema } from 'src/dal/cinema.entity';
import { IsAdmin } from 'src/services/auth/custom-decorators/isAdmin.decorator';
import { idParam } from 'src/interface/index.ts';

@Controller('/cinema')
@UseGuards(AuthGuard())
export class CinemaController {
  constructor(private cinemaService: CinemaService) {}

  @Get('/')
  getCinema(): Promise<Cinema[]> {
    return this.cinemaService.getCinema();
  }

  @Get('/:id')
  getCinemaById(@IsAdmin() isAdmin, @Param() param: idParam): Promise<Cinema> {
    const { id } = param;
    return this.cinemaService.getCinemaById(+id);
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
  deleteCinema(@IsAdmin() isAdmin, @Param() param: idParam) {
    const { id } = param;
    return this.cinemaService.remove(+id);
  }

  @Post('/:id/movie')
  addMovieToCinema(@IsAdmin() isAdmin, @Body() movie, @Param() param: object) {
    return this.cinemaService.addMovie(movie, param);
  }
}
