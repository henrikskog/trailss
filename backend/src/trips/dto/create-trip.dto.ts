export class CreateTripDto {
    origin: string;
    destination: string; 
    distance: number;
    total_emissions: number;
    date: Date;
    duration: number;
}