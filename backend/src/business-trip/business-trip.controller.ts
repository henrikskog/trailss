import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtCompanyAuthGuard } from 'src/authCompany/jwt-auth-guard-company.guard';
import { UpdateCompanyVehicleDto } from 'src/company-vehicles/dto/update-company-vehicle.dto';
import { BusinessTripService } from './business-trip.service';
import { CreateBusinessTripVehicleDto } from './dto/create-business-trip-vehicle.dto';
import { CreateBusinessTripDto } from './dto/create-business-trip.dto';
import { UpdateBusinessTripDto } from './dto/update-business-trip.dto';

@ApiTags('BusinessTrip')
@Controller('business-trip')
export class BusinessTripController {
  constructor(private readonly businessTripService: BusinessTripService) {}

  @UseGuards(JwtCompanyAuthGuard)  
  @Post('')
  @ApiBearerAuth()
  async create(@Request() req: any, @Body() businessTripCompanyDto: CreateBusinessTripDto) {
    return this.businessTripService.create(req.user, businessTripCompanyDto);
  }

  @UseGuards(JwtCompanyAuthGuard)  
  @Get('')
  @ApiBearerAuth()
  async findAll(@Request() req: any) {
    return this.businessTripService.findAll(req.user);
  }

  @UseGuards(JwtCompanyAuthGuard)  
  @Get(':id')
  @ApiBearerAuth()
  async findOne(@Request() req: any, @Param("id") id: string) {
    return this.businessTripService.findOne(req.user, id);
  }

  @UseGuards(JwtCompanyAuthGuard)
  @Patch(':id')
  @ApiBearerAuth()
  async update(@Request() req: any, @Param("id") id: string, @Body() updateBusinessTripDto: UpdateBusinessTripDto) {
    return this.businessTripService.update(req.user.business_trips, id, updateBusinessTripDto);
  }

  @UseGuards(JwtCompanyAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  async remove(@Request() req: any, @Param("id") id: string) {
    return this.businessTripService.remove(req.user, id);
  }
}
