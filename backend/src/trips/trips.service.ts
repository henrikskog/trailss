import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { VehiclesService } from '../vehicles/vehicles.service';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { TripDocument } from "./trips.model";
import { vehicleFuelSchema, VehicleFuelType } from '../vehicles/entities/vehicle.entity';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Injectable()
export class TripsService {
  constructor( private readonly vehicleService: VehiclesService, @InjectModel('trip') private readonly tripModel: Model<TripDocument>) {}
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

  create(user: any, createTripDto: CreateTripDto){
    const trip = this.tripModel.create(createTripDto)
    user.trips.push(trip)
    user.save()
    return "Created a new trip"
  }

  findOne(user: any, id: string){
      return user.trips.filter(trip => trip._id.toString() == id)
  }

  update(user: any, id: string, updateTripDto: UpdateTripDto) {
    const trip = user.trip.filter(vehicle => vehicle._id.toString() == id)

    if (!trip) throw new NotFoundException("No trip with the given id was found");

    this.tripModel.findByIdAndUpdate(trip._id, updateTripDto)
    return "Trip updated successfully"
  }

  remove(user: any, id: string) {
    const trip = user.trip.filter(vehicle => vehicle._id.toString() == id)

    if (!trip) throw new NotFoundException("No trip with the given id was found");

    this.tripModel.findByIdAndRemove(trip._id)
    return "Trip updated successfully"
  }
}
