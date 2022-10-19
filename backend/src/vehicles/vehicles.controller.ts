import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Post("Unfinished-post")

  @ApiQuery({ name: "car-make", required: true, description: "E.g. volvo" })
  @ApiQuery({ name: "car-model", required: true, description: "E.g. XC90" })
  @ApiQuery({ name: "car-model-year", required: true, description: "E.g. 2020" })
  @ApiQuery({ name: "consumptions", required: true, description: "Liters fuel per kilometer (L/km)" })
  @ApiQuery({ name: "fuel-type", required: true, description: "Type of fuel. (diesel, petrol, LPG)" })
  @ApiQuery({ name: "personalName", required: false, description: "E.g. Rayo McQueen" })

  createUnfinished(
    @Query('car-make') make: string, 
    @Query('car-model') model: string, 
    @Query('car-model-year') year: number,
    @Query('consumptions') consumptions: number,
    @Query('fuel-type') fuelType: string,
    @Query('personalName') personalName: string) {
    var v = new CreateVehicleDto()
    v.make = make;
    v.model = model;
    v.year = year;
    v.consumptions = consumptions;
    v.fuelType = fuelType;
    v.personalName = personalName;
    return this.vehiclesService.create(v);
  }

  @Get("testing")
  create2() {
    const t = new CreateVehicleDto()
    t.consumptions = 100;
    t.make = "Volvo";
    t.model = "XC90";
    t.year = 202;
    t.personalName = "Henriks Car";
    return this.vehiclesService.create(t);
  }

  @Get()
  findAll() {
    return this.vehiclesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(id);
  }
}
