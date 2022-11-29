import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { z } from "zod";
import { VehiclesService } from "../vehicles/vehicles.service";
import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";
import { Trip, TripDocument } from "./trips.schema";

export const vehicleFuelSchema = z
  .literal("diesel")
  .or(z.literal("petrol"))
  .or(z.literal("LPG"));
export type VehicleFuelType = z.infer<typeof vehicleFuelSchema>;

@Injectable()
export class TripsService {
  constructor(
    private readonly vehicleService: VehiclesService,
    @InjectModel(Trip.name) private tripModel: Model<TripDocument>
  ) {}
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
    make?: string | undefined,
    model?: string | undefined,
    year?: number | undefined,
    consumption?: number | undefined
  ): Promise<number> {
    if (!consumption) {
      const consumptionMPG = await this.vehicleService.fetchFuelConsumption(
        make,
        model,
        year
      );
      consumption = 235.214583 / consumptionMPG; // Constant to convert from MPG to l/100km
    }

    const fuel = vehicleFuelSchema.safeParse(fuelType);

    // Fuel types are restricted, therefore validate value
    if (!fuel.success) {
      // TODO: fix zod here
      throw new BadRequestException("Illegal value given for fuel type");
    }

    const emissions = this.vehicleService.getEmissions(fuel.data, consumption);

    // Round to one decimal place
    const tripEmssions = Math.round(emissions * distance * 10) / 10;

    return tripEmssions;
  }

  async create(user: any, createTripDto: CreateTripDto) {
    const trip = await this.tripModel.create(createTripDto);
    user.trips.push(trip);
    user.save();
    return trip;
  }

  async findAll(user: any) {
    const trips = await user.populate("trips").then((p) => p.trips);
    return trips;
  }

  async findOne(user: any, id: string) {
    const trip = await user
      .populate("trips", null, { _id: id })
      .then((p) => p.trips);
    if (!trip.length) {
      throw new NotFoundException("No trip with the given arguments was found");
    }
    return trip[0];
  }

  async update(
    tripsIds: [mongoose.Schema.Types.ObjectId],
    id: string,
    updateTripDto: UpdateTripDto
  ) {
    const trip = tripsIds.filter((trip) => trip.toString() == id);
    if (!trip.length) {
      throw new NotFoundException("No trip with the given id was found");
    }
    await this.tripModel.findByIdAndUpdate(trip[0], updateTripDto);
    return "Trip updated successfully";
  }

  async remove(user: any, id: string) {
    const trip = user.trips.filter((trip) => trip.toString() == id);

    if (!trip.length) {
      throw new NotFoundException("No trip with the given id was found");
    }
    user.trips.pull({ _id: trip[0] });
    user.save();
    await this.tripModel.findByIdAndDelete(trip[0]);

    return "Trip deleted successfully";
  }
}
