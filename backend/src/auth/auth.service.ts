import { Injectable, NotAcceptableException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(firstparam: string, password: string): Promise<any> {
    let user = await this.usersService.getUserByUserName({ username:  firstparam});    
    if (!user) user = await this.usersService.getUserByEmail({ email: firstparam});
    if (!user) {
      throw new NotAcceptableException("could not find the user");
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (user && passwordValid) {
      return user;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
