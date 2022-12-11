import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { BusinessTrip, BusinessTripSchema } from './business-trip.schema';
import { BusinessTripController } from './business-trip.controller';
import { BusinessTripService } from './business-trip.service';
import { TripsService } from '../trips/trips.service';
import { VehiclesModule } from 'src/vehicles/vehicles.module';
import { TripsModule } from 'src/trips/trips.module';


@Module({
  imports: [MongooseModule.forFeature([{ name: BusinessTrip.name, schema: BusinessTripSchema }]), VehiclesModule, TripsModule],
  controllers: [BusinessTripController],
  providers: [BusinessTripService, TripsService],
  exports: [BusinessTripService, MongooseModule],
})
export class BusinessTripModule {}
