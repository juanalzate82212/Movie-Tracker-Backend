import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Movie, MovieDocument } from './movie.schema';

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
        userId: string,
        tmdbId: number,
        status: 'pending' | 'watched',
        rating?: number,
    ) {
        return this.movieModel.findOneAndUpdate(
            { userId, tmdbId },
            { status, rating },
            { new: true },
        );
    }
}