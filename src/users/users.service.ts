import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.schema';
import { Model, Types } from 'mongoose';
import { Movie, MovieDocument } from 'src/movies/movie.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
    ) { }

    async create(email: string, password: string) {
        return this.userModel.create({ email, password });
    }

    async findByEmail(email: string) {
        return this.userModel.findOne({ email });
    }

    async getUserStats(userId: string) {
        const uid = new Types.ObjectId(userId);

        const totalMovies = await this.movieModel.countDocuments({ userId: uid });
        const watched = await this.movieModel.countDocuments({ userId: uid, status: 'watched' });
        const pending = await this.movieModel.countDocuments({ userId: uid, status: 'pending' });

        const avgRatingResult = await this.movieModel.aggregate([
            { $match: { userId: uid, rating: { $ne: null } } },
            { $group: { _id: null, avgRating: { $avg: '$rating' } } },
        ]);

        const mostAdded = await this.movieModel.aggregate([
            { $match: { userId: uid, rating: { $ne: null } } },
            { $group: { _id: '$tmdbId', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 },
        ]);

        return {
            totalMovies,
            watched,
            pending,
            averageRating: avgRatingResult[0]?.avgRating ?? null,
            mostAddedTmdbId: mostAdded[0]?._id ?? null,
            mostAddedCount: mostAdded[0]?.count ?? 0,
        };
    }
}
