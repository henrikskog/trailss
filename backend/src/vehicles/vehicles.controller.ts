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
import { ApiAcceptedResponse, ApiBearerAuth, ApiBody, ApiExtraModels, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { JwtStrategy } from '../auth/jwt.strategy';
import { Vehicle } from "./entities/vehicle.entity";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("Vehicles")
@Controller("vehicles")
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @UseGuards(AuthGuard('jwt'))  
  @Post()
  @ApiBearerAuth()
  create(@Request() req: any, @Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(req.user, createVehicleDto);
  }

  @UseGuards(AuthGuard('jwt'))  
  @Get()
  @ApiBearerAuth()
  findAll(@Request() req: any) {
    return this.vehiclesService.findAll(req.user.trips)
  }
  
  @UseGuards(AuthGuard('jwt'))  
  @Get(":id")
  @ApiBearerAuth()
  findOne(@Request() req: any, @Param("id") id: string) {
    return this.vehiclesService.findOne(req.user.trips, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(":id")
  @ApiBearerAuth()
  update(@Request() req: any, @Param("id") id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(req.user.trips, id, updateVehicleDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(":id")
  @ApiBearerAuth()
  remove(@Request() req: any, @Param("id") id: string) {
    return this.vehiclesService.remove(req.user, id);
  }
}
