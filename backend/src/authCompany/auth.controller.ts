import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { ApiQuery} from "@nestjs/swagger";
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Company')
@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Get('company/login')
    @ApiQuery({ name: "companyname", required: true, description: "E.g. trailss"})
    @ApiQuery({ name: "password", required: true, description: "E.g. jI108aaGsb" })    
    async login(
        @Request() req,     
    ) {
        return this.authService.login(req.company);
    }
}