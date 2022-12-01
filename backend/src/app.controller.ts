import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AppService } from "./app.service";

@ApiTags('Miaaaau')
@Controller('app')
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get('/aaaa')
    async testMethod(){
        return await this.appService.handleCron()
    }
}