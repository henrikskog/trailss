import { forwardRef, Module } from "@nestjs/common";
import { TripsService } from "./trips.service";
import { TripsController } from "./trips.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { VehiclesModule } from "src/vehicles/vehicles.module";
import { Trip, TripSchema } from "./trips.schema";
import { VehiclesService } from "src/vehicles/vehicles.service";
import { HttpModule } from "@nestjs/axios";
import { CompanyVehiclesModule } from "src/company-vehicles/company-vehicles.module";

@Module({
  imports: [
    forwardRef(() => VehiclesModule),
    MongooseModule.forFeature([{ name: Trip.name, schema: TripSchema }]),
    HttpModule
  ],
  providers: [TripsService, VehiclesService],
  controllers: [TripsController],
  exports: [TripsService, MongooseModule],
})
export class TripsModule {}
