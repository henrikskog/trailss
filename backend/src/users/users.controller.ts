import {
    Body,
    Controller, Delete, Get, Patch, Post, UseGuards
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
    ApiBearerAuth, ApiTags
} from "@nestjs/swagger";
import * as bcrypt from "bcrypt";
import { JwtAuthGuard } from "src/auth/jwt-auth-guard.guard";
import { JwtStrategy } from "src/auth/jwt.strategy";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthedUser as AuthedUser } from "./user.decorator";
import { User } from "./users.schema";
import { UsersService } from "./users.service";

@ApiTags("User")
@Controller("user")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/register")
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);

    // strip away password from returned user
    // TODO: look if this sends correct HTTP response on failure
    const user = await this.usersService.createUser(
      createUserDto.username,
      hashedPassword,
      createUserDto.email
    );

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getUserByToken(@AuthedUser() user) {
    // TODO: investigate how to return user without password
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUserByToken(
    @AuthedUser() user: User,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.updateUserByToken(user, updateUserDto);
  }

  @UseGuards(JwtStrategy)
  @Delete()
  @ApiBearerAuth()
  remove(@AuthedUser() user) {
    return this.usersService.removeUserByToken(user);
  }
}
