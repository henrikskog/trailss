import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UsersService } from "../users/users.service";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ComapnyService } from "src/company/company.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly companyService: ComapnyService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "" + process.env.SECRET_KEY
        })
    }

    async validate(payload: any) {
        const company = await this.companyService.getCompanyById(payload.sub);
        if (!company) {
            throw new UnauthorizedException();
        }
        return company;
    }
}