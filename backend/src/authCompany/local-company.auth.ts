import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCompanyService } from './auth-company.service';

@Injectable()
export class LocalCompanyStrategy extends PassportStrategy(Strategy, 'local-company') {
    constructor(private authCompanyService: AuthCompanyService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        const company = await this.authCompanyService.validateCompany(username, password);
        if (!company) {
            throw new UnauthorizedException();
        }
        return company;
    }
}