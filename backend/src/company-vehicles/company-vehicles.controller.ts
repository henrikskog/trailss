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
  @Post(':fleetid')
  @ApiBearerAuth()
  async create(@Request() req: any, @Param("fleetid") fleetId: string, @Body() createCompanyVehicleDto: CreateCompanyVehicleDto) {
    return this.companyVehiclesService.create(req.user, fleetId, createCompanyVehicleDto);
  }

  @UseGuards(JwtCompanyAuthGuard)  
  @Get(':fleetid')
  @ApiBearerAuth()
  async findAll(@Request() req: any, @Param("fleetid") fleetId: string) {
    return this.companyVehiclesService.findAll(req.user, fleetId);
  }

  @UseGuards(JwtCompanyAuthGuard)  
  @Get('/:fleetid/:id')
  @ApiBearerAuth()
  async findOne(@Request() req: any, @Param("fleetid") fleetId: string, @Param("id") id: string) {
    return this.companyVehiclesService.findOne(req.user, fleetId, id);
  }

  @UseGuards(JwtCompanyAuthGuard)
  @Patch('/:fleetid/:id')
  @ApiBearerAuth()
  async update(@Request() req: any, @Param("fleetid") fleetId: string, @Param('id') id: string, @Body() updateCompanyVehicleDto: UpdateCompanyVehicleDto) {
    return this.companyVehiclesService.update(req.user, fleetId, id, updateCompanyVehicleDto);
  }

  @UseGuards(JwtCompanyAuthGuard)
  @Delete('/:fleetid/:id')
  @ApiBearerAuth()
  async remove(@Request() req: any, @Param("fleetid") fleetId: string, @Param("id") id: string) {
    return this.companyVehiclesService.remove(req.user, fleetId, id);
  }
}
