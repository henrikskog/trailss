import { Injectable, NotAcceptableException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/users/users.schema";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ) {}


  async validateUser(firstparam: string, password: string): Promise<User> {
    // Try to find user by username
    let user = await this.usersService.getUserByUserName({ username:  firstparam});    

    // Try to find user by email
    if (!user) 
      user = await this.usersService.getUserByEmail({ email: firstparam});

    if (!user) {
      throw new NotAcceptableException("could not find the user");
    }

    // Validate password
    const passwordValid = await bcrypt.compare(password, user.password);

    if(!passwordValid) {
      return null
    }

    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload, {secret: `${process.env.SECRET_KEY}`}),
    };
  }
}
