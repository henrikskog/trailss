import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { VehicleFuelType } from "src/vehicles/entities/vehicle.entity";
import { TripsService } from "./trips.service";
import { ApiTags } from '@nestjs/swagger';
import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";
import { AuthGuard } from "@nestjs/passport";

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
  @ApiQuery({ name: "distance", required: true, description: "Distance for the trip given in km" })
  @ApiQuery({ name: "fuel-type", required: true, description: "Type of fuel. (diesel, petrol, LPG)" })
  @ApiQuery({ name: "car-make", required: false, description: "E.g. volvo" })
  @ApiQuery({ name: "car-model", required: false, description: "E.g. XC90" })
  @ApiQuery({ name: "car-model-year", required: false, description: "E.g. 2020" })
  @ApiQuery({ name: "consumptions", required: false, description: "Liters fuel per kilometer (L/km)" })
  @ApiOperation({ summary: "Recieve the emissions of a trip" })
  @ApiResponse({ status: 200, description: "Grams CO2" })
  calculateEmissions(
    @Query("distance", ParseIntPipe) distance: number,
    @Query("fuel-type") fuelType: VehicleFuelType,
    @Query("car-make") make: string,
    @Query("car-model") model?: string,
    @Query("car-model-year") year?: number,
    @Query("consumptions") consumptions?: number
  ) {
    return this.tripsService.calculateTripEmissions(
      distance,
      fuelType,
      make,
      model,
      year,
      consumptions
    );
  }

  @UseGuards(AuthGuard('jwt'))  
  @Post()
  @ApiBearerAuth()
  create(@Request() req: any, @Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(req.user, createTripDto);
  }

  @UseGuards(AuthGuard('jwt'))  
  @Get()
  @ApiBearerAuth()
  findAll(@Request() req: any) {
    return this.tripsService.findAll(req.user.trips)
  }
  
  @UseGuards(AuthGuard('jwt'))  
  @Get(":id")
  @ApiBearerAuth()
  findOne(@Request() req: any, @Param("id") id: string) {
    return this.tripsService.findOne(req.user.trips, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(":id")
  @ApiBearerAuth()
  update(@Request() req: any, @Param("id") id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripsService.update(req.user.trips, id, updateTripDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(":id")
  @ApiBearerAuth()
  remove(@Request() req: any, @Param("id") id: string) {
    return this.tripsService.remove(req.user, id);
  }
}
