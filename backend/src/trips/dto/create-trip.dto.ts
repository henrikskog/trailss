import { Vehicle } from "src/vehicles/vehicles.schema";

export class CreateTripDto {
    from: string;
    to: string; 
    distance: number;
    date: Date;
    passengers: number;
    vehicle: Vehicle;
}