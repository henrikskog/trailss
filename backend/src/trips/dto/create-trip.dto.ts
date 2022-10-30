import { Vehicle } from "src/vehicles/vehicles.schema";

export class CreateTripDto {
    from: string;
    to: string; 
    distance: number;
    total_emissions: number;
    date: Date;
    passengers: number;
    vehicle: Vehicle;
}