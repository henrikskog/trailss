import { Vehicle } from "src/vehicles/vehicles.schema";

export class CreateTripDto {
    origin: string;
    destination: string; 
    distance: number;
    date: Date;
    passengers: number;
    vehicle: Vehicle;
}