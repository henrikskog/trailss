export class CreateVehicleDto {
    name?: string
    make: string
    model: string
    year: number;
    consumptions?: number;
    fuelType?: string;
}