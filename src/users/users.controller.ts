import { Controller, Post, Body, Get, UseGuards, Req, NotFoundException, Put, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getProfile(@CurrentUser() user) {
        const dbUser = await this.usersService.findByEmail(user.email);

        if (!dbUser) {
            throw new NotFoundException('Usuario No Encontrado');
        }

        return {
            id: dbUser.id,
            email: dbUser.email,
            profileImage: dbUser.profileImage,
            createdAt: dbUser.createdAt,
        };
    }

    // Stats del usuario
    @UseGuards(JwtAuthGuard)
    @Get('me/stats')
    async getStats(@CurrentUser() user) {
        return this.usersService.getUserStats(user.userId);
    }

    // Peliculas favoritas del usuario
    @UseGuards(JwtAuthGuard)
    @Get('me/favorites')
    getMyFavorites(@CurrentUser() user) {
        return this.usersService.getFavorites(user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Put('me/favorites')
    updateMyFavorites(@CurrentUser() user, @Body('favorites') favorites: number[],) {
        return this.usersService.updateFavorites(user.userId, favorites);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('me/favorites/:tmdbId')
    removeFavorite(@CurrentUser() user, @Param('tmdbId') tmdbId: string,) {
        return this.usersService.removeFavorite(user.userId, Number(tmdbId));
    }
}
