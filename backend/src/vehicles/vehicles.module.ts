import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TripSchema } from 'src/trips/trips.model';
import { TripsModule } from 'src/trips/trips.module';
import { TripsService } from 'src/trips/trips.service';
import { UsersModule } from 'src/users/users.module';
import { VehiclesController } from './vehicles.controller';
import { VehicleSchema } from './vehicles.schema';
import { VehiclesService } from './vehicles.service';

@Module({
  imports: [UsersModule, HttpModule, forwardRef(() => TripsModule), MongooseModule.forFeature([{ name: "vehicle", schema: VehicleSchema }]), MongooseModule.forFeature([{ name: "trip", schema: TripSchema }])],
  providers: [VehiclesService],
  controllers: [VehiclesController],
  exports: [VehiclesService]
})
export class VehiclesModule {}
