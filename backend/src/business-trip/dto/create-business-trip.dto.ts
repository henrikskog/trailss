import { BusinessTripVehicle } from "../business-trip.schema";

export class CreateBusinessTripDto{
   name: string;
   from: string;
   to: string;
   distance: number;
   date: Date;
   description: string;
   vehicles: BusinessTripVehicle[];
}