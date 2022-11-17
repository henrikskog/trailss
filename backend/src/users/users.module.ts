import { forwardRef, Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./users.schema";
import { TripsModule } from "src/trips/trips.module";
import { VehiclesModule } from "src/vehicles/vehicles.module";
import { VehiclesService } from "src/vehicles/vehicles.service";
import { TripsService } from "src/trips/trips.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => TripsModule),
    forwardRef(() => VehiclesModule),
    HttpModule
  ],
  providers: [UsersService, VehiclesService, TripsService],
  controllers: [UsersController],
})
export class UsersModule {}
