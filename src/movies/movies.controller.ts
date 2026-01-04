import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('movies')
@UseGuards(JwtAuthGuard)
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Post()
  addMovie(
    @CurrentUser() user,
    @Body() body: {
      tmdbId: number;
      status: 'pending' | 'watched';
      rating?: number;
    },
  ) {
    return this.moviesService.addMovie(
      user.userId,
      body.tmdbId,
      body.status,
      body.rating,
    );
  }

  @Get()
  getMyMovies(@CurrentUser() user) {
    return this.moviesService.getUserMovies(user.userId);
  }
}
