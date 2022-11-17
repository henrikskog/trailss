import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  Request,
  Patch,
  Delete,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  PickType,
} from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { User as UserSchema } from "./users.schema";
import * as bcrypt from "bcrypt";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { JwtStrategy } from "src/auth/jwt.strategy";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.decorator";

@ApiTags("User")
@Controller("user")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/register")
  async createUser(@Body() user: CreateUserDto): Promise<UserEntity> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);

    // strip away password from returned user
    // TODO: look if this sends correct HTTP response on failure
    await this.usersService.createUser(
      user.username,
      hashedPassword,
      user.email
    );

    return { username: user.username, email: user.email };
  }

  @UseGuards(AuthGuard("jwt"))
  @Get()
  @ApiBearerAuth()
  getUserByToken(@User() user: UserEntity) {
    return this.usersService.getUserByToken(user);
  }

  @Patch()
  updateUserByToken(
    @User() user: UserEntity,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.updateUserByToken(user, updateUserDto);
  }

  @UseGuards(JwtStrategy)
  @Delete()
  @ApiBearerAuth()
  remove(@User() user: UserEntity) {
    return this.usersService.removeUserByToken(user);
  }
}
