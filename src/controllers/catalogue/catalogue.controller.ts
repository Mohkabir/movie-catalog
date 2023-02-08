import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from 'src/services/account/dtos/create-user.dto';
import { MovieDto } from '../../services/catalogue/dtos/create-movie.dto';
import { MovieUpdateDto } from '../../services/catalogue/dtos/update-movie.dto';
import { MovieService } from 'src/services/catalogue/movie.service';
import { AuthService } from 'src/services/account/auth.service';

@Controller('/catalogue')
@UseGuards(AuthGuard())
export class CatalogueController {
  constructor(
    private movieService: MovieService,
    private authService: AuthService,
  ) {}
  @Post('/movie')
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
  deleteMovie(@Req() req, @Param() param: object) {
    this.authService.isAdmin(req);
    return this.movieService.remove(param);
  }

  @Patch('/movie/:id')
  updateMovie(
    @Req() req,
    @Body() movieUpdateDto: MovieUpdateDto,
    @Param() param: object,
  ) {
    this.authService.isAdmin(req);
    return this.movieService.update(movieUpdateDto, param);
  }
}
