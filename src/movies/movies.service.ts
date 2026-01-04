import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Movie, MovieDocument } from './movie.schema';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
    constructor(
        @InjectModel(Movie.name)
        private movieModel: Model<MovieDocument>,
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
        return this.movieModel.find(filter);
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