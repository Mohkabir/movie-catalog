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
import { User } from 'src/dal/user.entity';
import { GetUser } from 'src/services/auth/custom-decorators/get-user.decorator';
import { IsAdmin } from 'src/services/auth/custom-decorators/isAdmin.decorator';
import { idParam } from 'src/interface/index.ts';

@Controller('/catalogue')
export class CatalogueController {
  constructor(
    private movieService: MovieService,
    private authService: AuthService,
  ) {}

  @Post('/movie')
  @UseGuards(AuthGuard())
  addMovie(
    @IsAdmin() isAdmin,
    @Body() movieDto: MovieDto,
    @GetUser() user: User,
  ) {
    return this.movieService.create(movieDto, user);
  }

  @Get('/movie')
  getMovies() {
    return this.movieService.find();
  }

  @Get('/movie/:id')
  getMovie(@Param() param: idParam): Promise<MovieDto> {
    const { id } = param;
    return this.movieService.findOne(+id);
  }

  @Delete('/movie/:id')
  @UseGuards(AuthGuard())
  deleteMovie(@IsAdmin() isAdmin, @Param() param: idParam) {
    const { id } = param;
    return this.movieService.remove(+id);
  }

  @Patch('/movie/:id')
  @UseGuards(AuthGuard())
  updateMovie(
    @IsAdmin() isAdmin,
    @Body() movieUpdateDto: MovieUpdateDto,
    @Param() param: idParam,
  ) {
    const { id } = param;
    return this.movieService.update(movieUpdateDto, +id);
  }

  @Post('/movie/watchlist')
  @UseGuards(AuthGuard())
  addMovieWatchlist(@Body() idObj: idParam, @GetUser() user: User) {
    const { id } = idObj;
    return this.movieService.addWatchlist(+id, user);
  }
}
