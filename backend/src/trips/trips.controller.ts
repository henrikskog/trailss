import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { VehicleFuelType } from 'src/vehicles/entities/vehicle.entity';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import { TripsService } from './trips.service';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService, vehicleService: VehiclesService) {}

  @Get("calculate")
  /**
   * 
   * Conditions for endpoint
   * - (Consumption) is not compatible with (car-make, car-model and car-model-year)
   */
  // /trips/calculate?distance=10&fuel-type=EKG
  getHello(
    @Query('distance', ParseIntPipe) distance, 
    @Query('fuel-type') fuelType: VehicleFuelType,
    @Query('car-make') make, 
    @Query('car-model') model, 
    @Query('car-model-year') year,
    @Query('consuptions') consumptions   
    ) {      
    return this.tripsService.calculateTripEmissions(distance, fuelType, make, model, year, consumptions);
  }
}
