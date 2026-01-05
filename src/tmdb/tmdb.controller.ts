import { Controller, Get, Query, BadRequestException, Param, NotFoundException } from '@nestjs/common';
import { TmdbService } from './tmdb.service';

@Controller('tmdb')
export class TmdbController {
    constructor(private readonly tmdbService: TmdbService) { }

    @Get('search')
    search(@Query('query') query: string) {
        if (!query) {
            throw new BadRequestException('query is required');
        }
        return this.tmdbService.searchMovies(query);
    }

    @Get('movie/:tmdbId')
    getMovie(@Param('tmdbId') tmdbId: string) {
        const id = Number(tmdbId);

        if (isNaN(id)) {
            throw new NotFoundException('Invalid TMDB id');
        }

        return this.tmdbService.getMovieDetails(id);
    }
}
