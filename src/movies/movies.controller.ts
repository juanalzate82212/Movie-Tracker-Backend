import { Controller, Post, Get, Body, UseGuards, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { CreateMovieDto } from './dto/create-movie.dto';
import { QueryMoviesDto } from './dto/query-movies.dto';

@Controller('movies')
@UseGuards(JwtAuthGuard)
export class MoviesController {
  constructor(private moviesService: MoviesService) { }

  @Post()
  addMovie(
    @CurrentUser() user,
    @Body() body: CreateMovieDto
  ) {
    return this.moviesService.addMovie(
      user.userId,
      body.tmdbId,
      body.status,
      body.rating,
    );
  }

  @Get()
  getMyMovies(
    @CurrentUser() user,
    @Query() query: QueryMoviesDto,
  ) {
    return this.moviesService.getUserMovies(user.userId, query.status);
  }
}
