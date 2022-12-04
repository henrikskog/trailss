import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { CompanyVehiclesService } from './company-vehicles.service';
import { CompanyVehiclesController } from './company-vehicles.controller';
import { CompanyVehicle, CompanyVehiclesSchema } from './company-vehicles.schema';
import { TripsService } from 'src/trips/trips.service';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import { VehiclesModule } from 'src/vehicles/vehicles.module';
import { TripsModule } from 'src/trips/trips.module';


@Module({
  imports: [MongooseModule.forFeature([{ name: CompanyVehicle.name, schema: CompanyVehiclesSchema }]), VehiclesModule, TripsModule],
  controllers: [CompanyVehiclesController],
  providers: [CompanyVehiclesService, TripsService],
  exports: [CompanyVehiclesService, MongooseModule],
})
export class CompanyVehiclesModule {}
