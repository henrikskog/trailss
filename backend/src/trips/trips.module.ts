import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { VehiclesModule } from 'src/vehicles/vehicles.module';

@Module({
  imports: [TripsModule, VehiclesModule],
  providers: [TripsService],
  controllers: [TripsController]
})
export class TripsModule {}
