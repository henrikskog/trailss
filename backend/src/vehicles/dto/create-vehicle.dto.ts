export class CreateVehicleDto {
  name?: string;
  make: string;
  model: string;
  year: number;
  consumptions?: number;
  fuelType?: string;

  type: string;
  emissions: number;
  capacity: number;
  color: string;
  licensePlate: string;
  mileage: number;
  status: string;
}
