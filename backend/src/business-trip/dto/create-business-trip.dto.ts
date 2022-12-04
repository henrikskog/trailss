import { BusinessTripVehicle } from "../business-trip-vehicles.schema";

export class CreateBusinessTripDto{
   name: string;
   date: Date;
   description: string;
   vehicles: BusinessTripVehicle[];
}