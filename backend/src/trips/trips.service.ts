import { BadRequestException, Injectable } from '@nestjs/common';
import { VehiclesService } from '../vehicles/vehicles.service';
import { vehicleFuelSchema, VehicleFuelType } from '../vehicles/entities/vehicle.entity';

@Injectable()
export class TripsService {
  constructor( private readonly vehicleService: VehiclesService) {}
    /**
   * Fetch the fuel consumption for a given car 
   * Note: Gives the consumptions for the car with the minimum consumption should the API return multiple models
   *
   * Uses API: https://www.fueleconomy.gov/feg/ws/
   * @param distance The distance of the trip
   * @param make The make of the car used for the trip
   * @param model The model of the car used for the trip
   * @param year The year the car was made 
   * @param consumption The consumption
   * @param fuelType The fuel type of the car
   * @returns The emissions of the trip given in grams of CO2
   */
  async calculateTripEmissions(
    distance: number,
    fuelType: VehicleFuelType,
    make?:string | undefined,
    model?: string | undefined,
    year?: number | undefined,
    consumption?: number | undefined,    
  ): Promise<number> {
    if (!consumption) {
        const consumptionMPG = await this.vehicleService.fetchFuelConsumption(make, model, year)
        consumption = 235.214583 / consumptionMPG; // Constant to convert from MPG to l/100km
    }

    const fuel = vehicleFuelSchema.safeParse(fuelType)

    // Fuel types are restricted, therefore validate value
    if (!fuel.success) {
      // TODO: fix zod here
      throw new BadRequestException("Illegal value given for fuel type")
    }

    const emissions = this.vehicleService.getEmissions(fuel.data, consumption)
    
    // Round to one decimal place
    const tripEmssions = Math.round(emissions * distance * 10) / 10;

    return tripEmssions;
  }

}
