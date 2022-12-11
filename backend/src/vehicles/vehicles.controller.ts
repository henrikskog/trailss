import {
  Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth-guard.guard";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";
import { VehiclesService } from "./vehicles.service";

@ApiTags("Vehicles")
@Controller("vehicles")
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  create(@Request() req: any, @Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(req.user, createVehicleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth()
  findAll(@Request() req: any) {
    return this.vehiclesService.findAll(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  @ApiBearerAuth()
  findOne(@Request() req: any, @Param("id") id: string) {
    return this.vehiclesService.findOne(req.user, id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  @ApiBearerAuth()
  update(
    @Request() req: any,
    @Param("id") id: string,
    @Body() updateVehicleDto: UpdateVehicleDto
  ) {
    return this.vehiclesService.update(req.user.vehicles, id, updateVehicleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @ApiBearerAuth()
  remove(@Request() req: any, @Param("id") id: string) {
    return this.vehiclesService.remove(req.user, id);
  }

  @Get("calculate-consumptions")
  @ApiQuery({ name: "car-make", required: true, description: "E.g. volvo" })
  @ApiQuery({ name: "car-model", required: true, description: "E.g. XC90" })
  @ApiQuery({
    name: "car-model-year",
    required: true,
    description: "E.g. 2020",
  })

  @ApiOperation({ summary: "Recieve the consumptions of a vehicle" })
  calculateEmissions(
    @Query("car-make") make: string,
    @Query("car-model") model: string,
    @Query("car-model-year") year: number
  ) {
    return this.vehiclesService.fetchFuelConsumption(make, model, year);
  }
}
