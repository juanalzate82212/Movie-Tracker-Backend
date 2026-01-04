import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Controller('users')
export class UsersController {

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getProfile(@CurrentUser() user) {
        return user;
    }
}
