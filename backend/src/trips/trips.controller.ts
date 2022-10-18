import { Controller, Get, ParseIntPipe, Query } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { VehicleFuelType } from "src/vehicles/entities/vehicle.entity";
import { VehiclesService } from "src/vehicles/vehicles.service";
import { TripsService } from "./trips.service";

@Controller("trips")
export class TripsController {
  constructor(
    private readonly tripsService: TripsService,
    vehicleService: VehiclesService
  ) {}

  @Get("calculate")
  /**
   * Conditions for endpoint
   * - (Consumption) is not compatible with (car-make, car-model and car-model-year)
   */
  @ApiQuery({ name: "distance", required: true, description: "" })
  @ApiQuery({ name: "fuel-type", required: true, description: "" })
  @ApiQuery({ name: "car-make", required: false, description: "" })
  @ApiQuery({ name: "car-model", required: false, description: "" })
  @ApiQuery({ name: "car-model-year", required: false, description: "" })
  @ApiQuery({ name: "consumptions", required: false, description: "" })
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
}
