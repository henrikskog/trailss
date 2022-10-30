import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UsersService } from "../users/users.service";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "" + process.env.SECRET_KEY
        })
    }

    async validate(payload: any) {
        const user = await this.usersService.getUserById(payload.sub);
        console.log(user)
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}