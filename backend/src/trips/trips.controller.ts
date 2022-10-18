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
}
