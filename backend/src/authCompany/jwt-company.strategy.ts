import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UsersService } from "../users/users.service";
import { ExtractJwt, Strategy } from "passport-jwt";
import { CompanyService } from "src/company/company.service";

@Injectable()
export class JwtCompanyStrategy extends PassportStrategy(Strategy, 'jwt-company') {
    constructor(private readonly companyService: CompanyService) {
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