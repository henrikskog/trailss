import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.model';

@Injectable()
export class UsersService {
    constructor(@InjectModel('user') private readonly userModel: Model<UserDocument>) { }
    async createUser(username: string, password: string, email: string): Promise<User> {
        return this.userModel.create({
            username,
            password,
            email
        });
    }

    async getUserById(id: string ): Promise<User> {
        return this.userModel.findById(id);
    }

    async getUserByUserName(query: {username: string} ): Promise<User> {
        return this.userModel.findOne(query);
    }

    async getUserByEmail(query: {email: string} ): Promise<User> {
        return this.userModel.findOne(query);
    }

    getUserByToken(user: any) {
        return {username: user.username, email: user.email}
    }
}