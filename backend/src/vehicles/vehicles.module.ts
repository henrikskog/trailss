import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { VehiclesController } from './vehicles.controller';
import { VehicleSchema } from './vehicles.schema';
import { VehiclesService } from './vehicles.service';

@Module({
  imports: [UsersModule, HttpModule, MongooseModule.forFeature([{ name: "vehicle", schema: VehicleSchema }])],
  providers: [VehiclesService],
  controllers: [VehiclesController],
  exports: [VehiclesService]
})
export class VehiclesModule {}
