import { Vehicle } from "src/vehicles/vehicles.schema";

export class CreateTripDto {
    origin: string;
    destination: string; 
    distance: number;
    emissions: number;
    date: Date;
    car?: Vehicle;
    carModel?: string;
    carMake?: string;
    carYear?: number;
}