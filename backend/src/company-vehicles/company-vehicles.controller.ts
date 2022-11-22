import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtCompanyAuthGuard } from 'src/authCompany/jwt-auth-guard-company.guard';
import { CompanyVehiclesService } from './company-vehicles.service';
import { CreateCompanyVehicleDto } from './dto/create-company-vehicle.dto';
import { UpdateCompanyVehicleDto } from './dto/update-company-vehicle.dto';

@ApiTags('CompanyVehicles')
@Controller('company-vehicles')
export class CompanyVehiclesController {
  constructor(private readonly companyVehiclesService: CompanyVehiclesService) {}

  @UseGuards(JwtCompanyAuthGuard)  
  @Post()
  @ApiBearerAuth()
  async create(@Request() req: any, @Body() createCompanyVehicleDto: CreateCompanyVehicleDto) {
    return this.companyVehiclesService.create(req.company.fleets, createCompanyVehicleDto);
  }

  @UseGuards(JwtCompanyAuthGuard)  
  @Get()
  @ApiBearerAuth()
  async findAll(@Request() req: any) {
    return this.companyVehiclesService.findAll(req.company.fleets);
  }

  @UseGuards(JwtCompanyAuthGuard)  
  @Get(':id')
  async findOne(@Request() req: any, @Param("id") id: string) {
    return this.companyVehiclesService.findOne(req.company.fleets, id);
  }

  @UseGuards(JwtCompanyAuthGuard)
  @Patch(':id')
  async update(@Request() req: any, @Param('id') id: string, @Body() updateCompanyVehicleDto: UpdateCompanyVehicleDto) {
    return this.companyVehiclesService.update(req.company.fleets, id, updateCompanyVehicleDto);
  }

  @UseGuards(JwtCompanyAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  async remove(@Request() req: any, @Param("id") id: string) {
    return this.companyVehiclesService.remove(req.company, id);
  }
}
