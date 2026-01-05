import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './movie.schema';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TmdbModule } from 'src/tmdb/tmdb.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Movie.name, schema: MovieSchema },
    ]),
    TmdbModule,
  ],
  controllers: [MoviesController],
  providers: [MoviesService]
})
export class MoviesModule {}
