import { BusinessTripVehicle } from "../business-trip-vehicles.schema";

export class CreateBusinessTripDto{
   name: string;
   from: string;
   to: string;
   date: Date;
   description: string;
   vehicles: BusinessTripVehicle[];
}