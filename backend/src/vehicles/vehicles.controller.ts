import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from "@nestjs/common";
import { VehiclesService } from "./vehicles.service";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";
import { ApiAcceptedResponse, ApiBody, ApiExtraModels, ApiProperty, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { JwtStrategy } from '../auth/jwt.strategy';
import { Vehicle } from "./entities/vehicle.entity";
import { VehicleSchema } from "./vehicles.schema";

@ApiTags("Vehicles")
@Controller("vehicles")
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  @ApiAcceptedResponse({description: "hallloooo"})
  @ApiExtraModels()
  @ApiBody({schema: {$ref: getSchemaPath(Vehicle), example: {"name": "hello", "make": "volvo"}} })
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @UseGuards(JwtStrategy)
  @Get()
  findOne(@Request() req: any) {
    return this.vehiclesService.findOne(req.userId);
  }

  @Patch(":id")
  update(@Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(updateVehicleDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.vehiclesService.remove(id);
  }
}
