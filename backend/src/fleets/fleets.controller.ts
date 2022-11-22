import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FleetsService } from './fleets.service';
import { CreateFleetDto } from './dto/create-fleet.dto';
import { UpdateFleetDto } from './dto/update-fleet.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Fleets')
@Controller('fleets')
export class FleetsController {
  constructor(private readonly fleetsService: FleetsService) {}

  @Post()
  create(@Body() createFleetDto: CreateFleetDto) {
    return this.fleetsService.create(createFleetDto);
  }

  @Get()
  findAll() {
    return this.fleetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fleetsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFleetDto: UpdateFleetDto) {
    return this.fleetsService.update(+id, updateFleetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fleetsService.remove(+id);
  }
}
