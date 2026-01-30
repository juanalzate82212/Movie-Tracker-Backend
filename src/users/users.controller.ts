import { Controller, Post, Body, Get, UseGuards, Req, NotFoundException } from '@nestjs/common';
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
}
