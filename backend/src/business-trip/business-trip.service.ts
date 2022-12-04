import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { TripsService, vehicleFuelSchema, VehicleFuelType } from '../trips/trips.service';
import { BusinessTrip, BusinessTripDocument } from './business-trip-vehicles.schema';
import { CreateBusinessTripDto } from './dto/create-business-trip.dto';
import { UpdateBusinessTripDto } from './dto/update-business-trip.dto';

@Injectable()
export class BusinessTripService {
  constructor(
    @InjectModel(BusinessTrip.name) private readonly businessTripModel: Model<BusinessTripDocument>,
    private readonly tripsService: TripsService,
  ) { }

  async calculateTotalEmissions(businessTripCompanyDto: CreateBusinessTripDto | UpdateBusinessTripDto) {
    for (let index = 0; index < businessTripCompanyDto.vehicles.length; index++) {
      const vehicle = businessTripCompanyDto.vehicles[index];

      // Check if the trip is valid
      if (vehicle.passengers.length > 7) {
        throw new BadRequestException("The maximum number of passengers is 7");
      }

      //parse the fuel type to enum
      const fuelType = vehicleFuelSchema.safeParse(vehicle.type);
      // Fuel types are restricted, therefore validate value
      if (!fuelType.success) {
        throw new BadRequestException("Illegal value given for fuel type");
      }

      // Calculate the emissions
      const emissions = await this.tripsService.calculateTripEmissions(
        vehicle.route.distance,
        fuelType.data,
        vehicle.make,
        vehicle.model,
        vehicle.year,
        vehicle.consumption
      )
      // Add the emissions to the vehicle
      businessTripCompanyDto.vehicles[index].emissions = emissions;
      return businessTripCompanyDto;
    }

  }

  async create(company: any, businessTripCompanyDto: CreateBusinessTripDto) {
    // Calculate the emissions
    const businessTrip = await this.calculateTotalEmissions(businessTripCompanyDto)
    // Create the business trip
    const trip = await this.businessTripModel.create(businessTrip)

    // Add the business trip to the company
    company.business_trips.push(trip)
    company.save()
    return "Created a new trip";
  }

  async findAll(company: any) {
    const business_trips = await company.populate("business_trips").then(p => p.business_trips)
    return business_trips;
  }

  async findOne(company: any, tripId: string) {
    const trip = await company.populate("business_trips", null, { _id: tripId }).then(p => p.business_trips)
    if (!trip.length) {
      throw new NotFoundException("No trip with the given arguments was found");
    }
    return trip[0];
  }

  async update(
    businessTripIds: [mongoose.Schema.Types.ObjectId],
    id: string,
    updateBusinessTripDto: UpdateBusinessTripDto
  ) {
    const business_trips = businessTripIds.filter((business_trips) => business_trips.toString() == id);

    if (!business_trips.length)
      throw new NotFoundException("No trip with the given id was found");

    // Calculate the emissions
    const businessTrip = this.calculateTotalEmissions(updateBusinessTripDto)
    // Update the business trip
    await this.businessTripModel.findByIdAndUpdate(business_trips[0], businessTrip);
    return "Trip updated successfully";
  }

  async remove(company: any, businessTripId: string) {
    const business_trips = company.business_trips.filter((business_trips) => business_trips.toString() == businessTripId);

    if (!business_trips.length) {
      throw new NotFoundException("No trip with the given id was found");
    }
    company.business_trips.pull({ _id: business_trips[0] });
    company.save();
    await this.businessTripModel.findByIdAndDelete(business_trips[0]);

    return "Fleet removed successfully";
  }

}
