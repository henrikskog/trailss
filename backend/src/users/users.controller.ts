import { Body, Controller, Post, Get, Param, ParseIntPipe, Query, UseGuards, Request, Patch, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery } from "@nestjs/swagger";
import { UsersService } from './users.service';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User')
@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('/signup')
    @ApiQuery({ name: "username", required: true, description: "E.g. manolete97" })
    @ApiQuery({ name: "password", required: true, description: "E.g. asD2349pyN" })
    @ApiQuery({ name: "email", required: true, description: "E.g. manolo@gmail.com" })
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

    @UseGuards(AuthGuard('jwt'))
    @Get()
    @ApiBearerAuth()
    getUserByToken(@Request() req: any) {
        return this.usersService.getUserByToken(req.user)
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch()
    @ApiBearerAuth()
    updateUserByToken(@Request() req: any, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUserByToken(req.user, updateUserDto)
    }

    @UseGuards(JwtStrategy)
    @Delete()
    @ApiBearerAuth()
    remove(@Request() req: any) {
    return this.usersService.removeUserByToken(req.user);
  }
}