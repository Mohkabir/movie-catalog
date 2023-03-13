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
  getMovie(@Param() param: object): Promise<MovieDto> {
    return this.movieService.findOne(param);
  }

  @Delete('/movie/:id')
  @UseGuards(AuthGuard())
  deleteMovie(@IsAdmin() isAdmin, @Param() param: object) {
    return this.movieService.remove(param);
  }

  @Patch('/movie/:id')
  @UseGuards(AuthGuard())
  updateMovie(
    @IsAdmin() isAdmin,
    @Body() movieUpdateDto: MovieUpdateDto,
    @Param() param: object,
  ) {
    return this.movieService.update(movieUpdateDto, param);
  }
}
