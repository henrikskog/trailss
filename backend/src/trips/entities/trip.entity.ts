import { ApiProperty } from "@nestjs/swagger";
import { VehicleEntity } from "src/vehicles/entities/vehicle.entity";

export class TripEntity {
  @ApiProperty()
  from: string;

  @ApiProperty()
  to: string;

  @ApiProperty()
  distance: number;

  @ApiProperty()
  total_emissions: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  passengers: number;

  @ApiProperty({ type: [VehicleEntity] })
  vehicles: VehicleEntity[];

}
