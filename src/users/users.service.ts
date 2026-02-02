import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

    async getFavorites(userId: string) {
        const user = await this.userModel.findById(userId).select('favorites');

        if(!user){
            throw new NotFoundException('Usuario no encontrado');
        }

        return user.favorites;
    }

    async updateFavorites(userId: string, favorites: number[]) {
        if (favorites.length > 5){
            throw new BadRequestException('Máximo 5 películas favoritas');
        }

        const uniqueFavorites = [...new Set(favorites)];
        if (uniqueFavorites.length !== favorites.length) {
            throw new BadRequestException('No permiten duplicados');
        }

        const user = await this.userModel.findByIdAndUpdate(
            userId,
            { favorites: uniqueFavorites },
            { new: true },  
        );

        if (!user) {
            throw new NotFoundException('Usuario no encontrado')
        }

        return user.favorites;
    }

    async removeFavorite(userId: string, tmdbId: number) {
        const user = await this.userModel.findById(userId);

        if (!user) {
            throw new NotFoundException('Usuario no encontrado')
        }

        user.favorites = user.favorites.filter(id => id !== tmdbId);
        await user.save();

        return user.favorites;
    }
}
