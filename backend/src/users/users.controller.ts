import { Body, Controller, Post, Get, Param, ParseIntPipe, Query, UseGuards, Request, Patch, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, PickType } from "@nestjs/swagger";
import { UsersService } from './users.service';
import { User } from './users.schema';
import * as bcrypt from 'bcrypt';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('User')
@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('/register')
    async createUser(
        @Body() user: CreateUserDto
    ): Promise<UserEntity> {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);

        // strip away password from returned user
        // TODO: look if this sends correct HTTP response on failure
        await this.usersService.createUser(
            user.username,
            hashedPassword,
            user.email
        );

        return {username: user.username, email: user.email};
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