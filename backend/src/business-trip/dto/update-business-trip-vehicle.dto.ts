import { PartialType } from '@nestjs/swagger';
import { CreateBusinessTripVehicleDto } from './create-business-trip-vehicle.dto';

export class UpdateBusinessTripVehicleDto extends PartialType(CreateBusinessTripVehicleDto) {}
