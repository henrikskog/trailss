import { forwardRef, Module } from "@nestjs/common";
import { TripsService } from "./trips.service";
import { TripsController } from "./trips.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { VehiclesModule } from "src/vehicles/vehicles.module";
import { Trip, TripSchema } from "./trips.schema";

@Module({
  imports: [
    forwardRef(() => VehiclesModule),
    MongooseModule.forFeature([{ name: Trip.name, schema: TripSchema }]),
  ],
  providers: [TripsService],
  controllers: [TripsController],
  exports: [TripsService, MongooseModule],
})
export class TripsModule {}
