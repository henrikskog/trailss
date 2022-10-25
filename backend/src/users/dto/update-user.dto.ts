import { Trip } from "src/trips/trips.model";
import { Vehicle } from "src/vehicles/vehicles.schema";

export class UpdateUserDto {
    username: string;
    password: string;
    email: string;
    vehicles: [Vehicle]
    trips: [Trip]
}