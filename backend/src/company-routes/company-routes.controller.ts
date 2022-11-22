import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompanyRoutesService } from './company-routes.service';
import { CreateCompanyRouteDto } from './dto/create-company-route.dto';
import { UpdateCompanyRouteDto } from './dto/update-company-route.dto';

@ApiTags('CompanyRoutes')
@Controller('company-routes')
export class CompanyRoutesController {
  constructor(private readonly companyRoutesService: CompanyRoutesService) {}

  @Post()
  create(@Body() createCompanyRouteDto: CreateCompanyRouteDto) {
    return this.companyRoutesService.create(createCompanyRouteDto);
  }

  @Get()
  findAll() {
    return this.companyRoutesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyRoutesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyRouteDto: UpdateCompanyRouteDto) {
    return this.companyRoutesService.update(+id, updateCompanyRouteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyRoutesService.remove(+id);
  }
}
