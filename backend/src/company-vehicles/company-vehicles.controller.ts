import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompanyVehiclesService } from './company-vehicles.service';
import { CreateCompanyVehicleDto } from './dto/create-company-vehicle.dto';
import { UpdateCompanyVehicleDto } from './dto/update-company-vehicle.dto';

@ApiTags('CompanyVehicles')
@Controller('company-vehicles')
export class CompanyVehiclesController {
  constructor(private readonly companyVehiclesService: CompanyVehiclesService) {}

  @Post()
  create(@Body() createCompanyVehicleDto: CreateCompanyVehicleDto) {
    return this.companyVehiclesService.create(createCompanyVehicleDto);
  }

  @Get()
  findAll() {
    return this.companyVehiclesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyVehiclesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyVehicleDto: UpdateCompanyVehicleDto) {
    return this.companyVehiclesService.update(+id, updateCompanyVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyVehiclesService.remove(+id);
  }
}
