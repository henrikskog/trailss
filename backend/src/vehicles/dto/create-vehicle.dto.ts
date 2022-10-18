export class CreateVehicleDto {
    make: string
    model: string
    year: number;
    consumptions?: number;
    fuelType?: string;
    personalName?: string
}