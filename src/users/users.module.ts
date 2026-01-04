import { Module } from '@nestjs/common';
import { User, UserSchema } from './users.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema }
        ])
    ]
})
export class UsersModule { }
