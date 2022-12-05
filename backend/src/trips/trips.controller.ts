import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { TripsService, VehicleFuelType } from "./trips.service";
import { ApiTags } from '@nestjs/swagger';
import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";
import { AuthGuard } from "@nestjs/passport";
import { JwtStrategy } from "src/auth/jwt.strategy";
import { JwtAuthGuard } from "src/auth/jwt-auth-guard.guard";


@ApiTags('Trips')
@Controller("trips")
export class TripsController {
  constructor(
    private readonly tripsService: TripsService ) {}

  @Get("calculate")
  /**
   * Conditions for endpoint
   * - (Consumption) is not compatible with (car-make, car-model and car-model-year)
   */
  @ApiQuery({ name: "fuel-type", required: true, description: "Type of fuel. (diesel, petrol, LPG)" })
  @ApiQuery({ name: "car-make", required: false, description: "E.g. volvo" })
  @ApiQuery({ name: "car-model", required: false, description: "E.g. XC90" })
  @ApiQuery({ name: "car-model-year", required: false, description: "E.g. 2020" })
  @ApiQuery({ name: "consumptions", required: false, description: "Liters fuel per kilometer (L/km)" })
  @ApiOperation({ summary: "Recieve the emissions of a trip" })
  @ApiResponse({ status: 200, description: "Grams CO2" })
  calculateEmissions(
    @Query("fuel-type") fuelType: VehicleFuelType,
    @Query("car-make") make: string,
    @Query("car-model") model?: string,
    @Query("car-model-year") year?: number,
    @Query("consumptions") consumptions?: number
  ) {
    return this.tripsService.calculateTripEmissions(
      fuelType,
      make,
      model,
      year,
      consumptions
    );
  }

  @UseGuards(JwtAuthGuard)  
  @Post()
  @ApiBearerAuth()
  create(@Request() req: any, @Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(req.user, createTripDto);
  }

  @UseGuards(JwtAuthGuard)  
  @Get()
  @ApiBearerAuth()
  findAll(@Request() req: any) {
    return this.tripsService.findAll(req.user)
  }
  
  @UseGuards(JwtAuthGuard)  
  @Get(":id")
  @ApiBearerAuth()
  findOne(@Request() req: any, @Param("id") id: string) {
    return this.tripsService.findOne(req.user, id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  @ApiBearerAuth()
  update(@Request() req: any, @Param("id") id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripsService.update(req.user.trips, id, updateTripDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @ApiBearerAuth()
  remove(@Request() req: any, @Param("id") id: string) {
    return this.tripsService.remove(req.user, id);
  }
}
