import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtCompanyAuthGuard } from 'src/authCompany/jwt-auth-guard-company.guard';
import { CompanyRoutesService } from './company-routes.service';

@ApiTags('CompanyRoutes')
@Controller('company-routes')
export class CompanyRoutesController {
  constructor(private readonly companyRoutesService: CompanyRoutesService) {}

  @UseGuards(JwtCompanyAuthGuard)  
  @Get()
  @ApiBearerAuth()
  findAll() {
    return this.companyRoutesService.findAll();
  }

  @UseGuards(JwtCompanyAuthGuard)  
  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.companyRoutesService.findOne(id);
  }
}
