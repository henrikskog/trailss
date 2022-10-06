import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { Vehicle } from "./entities/vehicle.entity";
import { VehiclesService } from "./vehicles.service";

@ApiTags("Vehicles")
@Controller("vehicles")
export class VehiclesController {
  constructor(private vehicleService: VehiclesService) {}

  @ApiOkResponse({ type: Vehicle, isArray: true })
  @ApiQuery({ name: "model", required: false })
  @Get()
  getVehicles(@Query("model") model?: string): Vehicle[] {
    return this.vehicleService.findAll(model);
  }

  @ApiOkResponse({ type: Vehicle })
  @ApiNotFoundResponse()
  @Get(":id")
  getVehicleById(@Param("id", ParseIntPipe) id: number): Vehicle {
    // TODO: use pipes to automatically transform ID to numbr
    const vehicle = this.vehicleService.findById(id);

    if(!vehicle) {
      throw new NotFoundException("There exists no vehicle with the given ID.")
    }

    return vehicle

  }

  @ApiCreatedResponse({ type: Vehicle })
  @Post()
  createVehicle(@Body() body: CreateVehicleDto): Vehicle {
    this.vehicleService.createVehicle(body);
    return this.vehicleService.createVehicle(body);
  }
}
