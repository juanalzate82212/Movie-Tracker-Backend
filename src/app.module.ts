import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [AuthModule, MoviesModule, MongooseModule.forRoot('mongodb://localhost:27017/movie-tracker')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
