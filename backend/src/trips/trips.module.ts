import { forwardRef, Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VehiclesModule } from 'src/vehicles/vehicles.module';
import { TripSchema } from './trips.model';

@Module({
  imports: [forwardRef(() => VehiclesModule), MongooseModule.forFeature([{ name: "trip", schema: TripSchema }])],
  providers: [TripsService],
  controllers: [TripsController],
  exports: [TripsService]
})
export class TripsModule {}
