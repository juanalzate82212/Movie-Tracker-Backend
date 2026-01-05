import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Movie, MovieDocument } from './movie.schema';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { TmdbService } from 'src/tmdb/tmdb.service';

@Injectable()
export class MoviesService {
    constructor(
        @InjectModel(Movie.name)
        private movieModel: Model<MovieDocument>,
        private readonly tmdbService: TmdbService,
    ) { }

    async addMovie(
        userId: string,
        tmdbId: number,
        status: 'pending' | 'watched',
        rating?: number,
    ) {
        return this.movieModel.create({
            userId: new Types.ObjectId(userId),
            tmdbId,
            status,
            rating,
        });
    }

    async getUserMovies(userId: string, status?: 'pending' | 'watched') {
        const filter: any = { userId: new Types.ObjectId(userId) };
        if (status) filter.status = status;
        const movies = await this.movieModel.find(filter);
        return Promise.all(
            movies.map(async (movie) => {
                const details = await this.tmdbService.getMovieDetails(movie.tmdbId);
                return {
                    ...movie.toObject(),
                    movie: details,
                };
            }),
        );
    }

    async updateMovie(
        movieId: string,
        userId: string,
        updates: UpdateMovieDto,
    ) {
        const movie = await this.movieModel.findById(movieId);

        if (!movie) {
            throw new NotFoundException('Movie not found');
        }

        if (movie.userId.toString() !== userId) {
            throw new ForbiddenException('Not your movie');
        }

        Object.assign(movie, updates);
        return movie.save();
    }

    async deleteMovie(movieId: string, userId: string) {
        const movie = await this.movieModel.findById(movieId);

        if (!movie) {
            throw new NotFoundException('Movie not found');
        }

        if (movie.userId.toString() !== userId) {
            throw new ForbiddenException('Not your movie');
        }

        await movie.deleteOne();
        return { deleted: true };
    }
}