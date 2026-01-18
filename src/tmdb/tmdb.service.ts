import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TmdbService {
    constructor(
        private httpService: HttpService,
        private configService: ConfigService,
    ) { }

    async searchMovies(query: string) {
        const apiKey = this.configService.get<string>('TMDB_API_KEY');
        const baseUrl = this.configService.get<string>('TMDB_BASE_URL');

        try {
            const response = await firstValueFrom(
                this.httpService.get(`${baseUrl}/search/movie`, {
                    params: {
                        api_key: apiKey,
                        query,
                    },
                }),
            );

            return response.data.results.map((movie) => ({
                tmdbId: movie.id,
                title: movie.title,
                releaseDate: movie.release_date,
                posterPath: movie.poster_path,
            }));
        } catch (error) {
            throw new InternalServerErrorException('Error fetching data from TMDB');
        }
    }

    async getMovieDetails(tmdbId: number) {
        const apiKey = this.configService.get<string>('TMDB_API_KEY');
        const baseUrl = this.configService.get<string>('TMDB_BASE_URL');

        try {
            const [movieResponse, director] = await Promise.all([
                firstValueFrom(
                    this.httpService.get(`${baseUrl}/movie/${tmdbId}`, {
                        params: {
                            api_key: apiKey,
                        },
                    }),
                ),
                this.getMovieDirector(tmdbId),
            ]);

            const movie = movieResponse.data;
            return {
                tmdbId: movie.id,
                title: movie.title,
                overview: movie.overview,
                releaseDate: movie.release_date,
                runtime: movie.runtime,
                genres: movie.genres.map((g) => g.name),
                posterPath: movie.poster_path,
                director,
            };
        } catch (error) {
            if (error.response?.status === 404) {
                throw new NotFoundException('Movie not found in TMDB');
            }

            throw new InternalServerErrorException('Error fetching data from TMDB');
        }
    }

    private async getMovieDirector(tmdbId: number): Promise<string | null> {
        const apiKey = this.configService.get<string>('TMDB_API_KEY');
        const baseUrl = this.configService.get<string>('TMDB_BASE_URL');

        try {
            const response = await firstValueFrom(
                this.httpService.get(`${baseUrl}/movie/${tmdbId}/credits`, {
                    params: { api_key: apiKey },
                }),
            );

            const director = response.data.crew.find(
                (member) => member.job === 'Director',
            );

            return director ? director.name : null;
        } catch {
            return null; // no rompemos el flujo si falla credits
        }
    }
}