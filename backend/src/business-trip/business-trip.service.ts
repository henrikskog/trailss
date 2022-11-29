import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Vehicle } from 'src/vehicles/vehicles.schema';
import { BusinessTrip, BusinessTripDocument } from './business-trip-vehicles.schema';
import { CreateBusinessTripDto } from './dto/create-business-trip.dto';
import { UpdateBusinessTripDto } from './dto/update-business-trip.dto';

@Injectable()
export class BusinessTripService {
  constructor(
    @InjectModel(BusinessTrip.name) private readonly businessTripModel: Model<BusinessTripDocument>
      ) { }

  async create(company: any, businessTripCompanyDto: CreateBusinessTripDto) {
    const trip = await this.businessTripModel.create(businessTripCompanyDto)
    
    trip.vehicles.forEach(vehicle => {
      if (vehicle.passengers.length > 7) 
        return "The maximum number of passengers is 7"
    });

    company.business_trips.push(trip)
    company.save()
    return "Created a new trip";
  }

  async findAll(company: any) {
    const business_trips = await company.populate("business_trips").then(p => p.business_trips)
    return business_trips;
  }

  async findOne(company: any, tripId: string) {
    const trip = await company.populate("business_trips", null, {_id : tripId}).then(p => p.business_trips)
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

    updateBusinessTripDto.vehicles.forEach(vehicle => {
      if (vehicle.passengers.length > 7) {
        return "The maximum number of passengers is 7"
      }
    });
    await this.businessTripModel.findByIdAndUpdate(business_trips[0], updateBusinessTripDto);
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