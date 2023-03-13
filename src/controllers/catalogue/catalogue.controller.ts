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
import { MovieDto } from '../../services/movie/dtos/create-movie.dto';
import { MovieUpdateDto } from '../../services/movie/dtos/update-movie.dto';
import { MovieService } from 'src/services/movie/movie.service';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('/catalogue')
export class CatalogueController {
  constructor(
    private movieService: MovieService,
    private authService: AuthService,
  ) {}

  @Post('/movie')
  @UseGuards(AuthGuard())
  addMovie(@Req() req, @Body() movieDto: MovieDto) {
    this.authService.isAdmin(req);
    return this.movieService.create(movieDto);
  }

  @Get('/movie')
  getMovies() {
    return this.movieService.find();
  }

  @Get('/movie/:id')
  getMovie(@Param() param: object): Promise<MovieDto> {
    return this.movieService.findOne(param);
  }

  @Delete('/movie/:id')
  @UseGuards(AuthGuard())
  deleteMovie(@Req() req, @Param() param: object) {
    this.authService.isAdmin(req);
    return this.movieService.remove(param);
  }

  @Patch('/movie/:id')
  @UseGuards(AuthGuard())
  updateMovie(
    @Req() req,
    @Body() movieUpdateDto: MovieUpdateDto,
    @Param() param: object,
  ) {
    this.authService.isAdmin(req);
    return this.movieService.update(movieUpdateDto, param);
  }
}
