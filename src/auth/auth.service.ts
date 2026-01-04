import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async register(email: string, password: string) {
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) {
            throw new UnauthorizedException('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.usersService.create(email, hashedPassword);

        return { id: user.id, email: user.email };
    }

    async login(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        } 

        const PasswordMatch = await bcrypt.compare(password, user.password);
        if (!PasswordMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload);

        return { access_token: token };
    }
}
