import { Body, Controller, Post, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiQuery} from "@nestjs/swagger";
import { UsersService } from './users.service';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('/signup')
    @ApiQuery({ name: "username", required: true, description: "E.g. manolete97"})
    @ApiQuery({ name: "password", required: true, description: "E.g. asD2349pyN" })   
    @ApiQuery({ name: "email", required: true, description: "E.g. manolo@gmail.com"})
    async createUser(
        @Query("username") username: string,
        @Query("password") password: string,      
        @Query("email") email: string 
    ): Promise<User> {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        const result = await this.usersService.createUser(
            username,
            hashedPassword,
            email
        );
        return result;
    }
}