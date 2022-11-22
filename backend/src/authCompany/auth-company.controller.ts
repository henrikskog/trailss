import { Controller, Request, UseGuards, Get } from '@nestjs/common';
import { ApiQuery} from "@nestjs/swagger";
import { AuthCompanyService } from './auth-company.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Company')
@Controller()
export class AuthCompanyController {
    constructor(private authCompanyService: AuthCompanyService) { }

    @UseGuards(AuthGuard('local-company'))
    @Get('company/login')
    @ApiQuery({ name: "username", required: true, description: "E.g. trailss"})
    @ApiQuery({ name: "password", required: true, description: "E.g. jI108aaGsb" })    
    async login(
        @Request() req,     
    ) {
        return this.authCompanyService.login(req.user);
    }
}