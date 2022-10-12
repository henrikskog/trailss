import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';

@Module({
  imports: [HttpModule],
  providers: [VehiclesService]
})
export class VehiclesModule {}
