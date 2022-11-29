import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { BusinessTrip, BusinessTripSchema } from './business-trip-vehicles.schema';
import { BusinessTripController } from './business-trip.controller';
import { BusinessTripService } from './business-trip.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: BusinessTrip.name, schema: BusinessTripSchema }])],
  controllers: [BusinessTripController],
  providers: [BusinessTripService],
  exports: [BusinessTripService, MongooseModule],
})
export class BusinessTripModule {}
