import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AppService } from "./app.service";

@ApiTags('App')
@Controller('app')
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get('')
    async getRoutes(){
        return await this.appService.handleCron()
    }
}