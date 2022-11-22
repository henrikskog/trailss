import {
    Body,
    Controller, Delete, Get, Patch, Post, UseGuards
} from "@nestjs/common";
import {
    ApiBearerAuth, ApiTags
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth-guard.guard";
import { JwtStrategy } from "src/auth/jwt.strategy";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthedUser as AuthedUser } from "./user.decorator";
import { User, UserFromDB } from "./users.schema";
import { UsersService } from "./users.service";

@ApiTags("User")
@Controller("user")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/register")
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    // strip away password from returned user
    // TODO: look if this sends correct HTTP response on failure
    const user = await this.usersService.createUser(createUserDto);

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
    @AuthedUser() user: UserFromDB,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.updateUserByToken(user, updateUserDto);
  }

  @UseGuards(JwtStrategy)
  @Delete()
  @ApiBearerAuth()
  remove(@AuthedUser() user) {
    return this.usersService.deleteUser(user);
  }
}
