import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { ApiQuery} from "@nestjs/swagger";
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    @ApiQuery({ name: "username", required: true, description: "E.g. manolete97"})
    @ApiQuery({ name: "password", required: true, description: "E.g. asD2349pyN" })    
    async login(
        @Request() req,     
    ) {        
        return this.authService.login(req.user);
    }
}