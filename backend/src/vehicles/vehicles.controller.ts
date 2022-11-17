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
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "src/auth/jwt-auth-guard.guard";
import { AuthedUser } from "src/users/user.decorator";

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
  findAll(@AuthedUser() user) {
    return this.vehiclesService.findAll(user)
  }
  
  @UseGuards(JwtAuthGuard)  
  @Get(":id")
  @ApiBearerAuth()
  findOne(@Request() req: any, @Param("id") id: string) {
    return this.vehiclesService.findOne(req.user.vehicles, id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  @ApiBearerAuth()
  update(@Request() req: any, @Param("id") id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(req.user.vehicles, id, updateVehicleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @ApiBearerAuth()
  remove(@Request() req: any, @Param("id") id: string) {
    return this.vehiclesService.remove(req.user, id);
  }
}
