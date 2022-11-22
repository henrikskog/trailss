import { HttpModule } from "@nestjs/axios";
import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TripsModule } from "src/trips/trips.module";
import { UsersModule } from "src/users/users.module";
import { VehiclesController } from "./vehicles.controller";
import { Vehicle, VehicleSchema } from "./vehicles.schema";
import { VehiclesService } from "./vehicles.service";

@Module({
  imports: [
    HttpModule,
    forwardRef(() => UsersModule),
    forwardRef(() => TripsModule),
    MongooseModule.forFeature([
      { name: Vehicle.name, schema: VehicleSchema },
    ]),
  ],
  providers: [VehiclesService],
  controllers: [VehiclesController],
  exports: [VehiclesService, MongooseModule],
})
export class VehiclesModule {}
