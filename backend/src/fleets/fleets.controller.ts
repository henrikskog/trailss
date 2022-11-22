import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { FleetsService } from './fleets.service';
import { CreateFleetDto } from './dto/create-fleet.dto';
import { UpdateFleetDto } from './dto/update-fleet.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtCompanyAuthGuard } from 'src/authCompany/jwt-auth-guard-company.guard';

@ApiTags('Fleets')
@Controller('fleets')
export class FleetsController {
  constructor(private readonly fleetsService: FleetsService) {}

  @UseGuards(JwtCompanyAuthGuard)  
  @Post()
  @ApiBearerAuth()
  async create(@Request() req: any, @Body() createFleetDto: CreateFleetDto) {
    return this.fleetsService.create(req.user, createFleetDto);
  }

  @UseGuards(JwtCompanyAuthGuard)  
  @Get()
  @ApiBearerAuth()
  async findAll(@Request() req: any) {
    return this.fleetsService.findAll(req.user)
  }
  
  @UseGuards(JwtCompanyAuthGuard)  
  @Get(":id")
  @ApiBearerAuth()
  async findOne(@Request() req: any, @Param("id") id: string) {
    return this.fleetsService.findOne(req.user, id);
  }

  @UseGuards(JwtCompanyAuthGuard)
  @Patch(":id")
  @ApiBearerAuth()
  async update(@Request() req: any, @Param("id") id: string, @Body() updateFleetDto: UpdateFleetDto) {
    return this.fleetsService.update(req.user.vehicles, id, updateFleetDto);
  }

  @UseGuards(JwtCompanyAuthGuard)
  @Delete(":id")
  @ApiBearerAuth()
  async remove(@Request() req: any, @Param("id") id: string) {
    return this.fleetsService.remove(req.user, id);
  }
}
