import { PartialType } from '@nestjs/swagger';
import { CreateBusinessTripVehicleDto } from './create-business-trip-vehicle.dto';
import { CreateBusinessTripDto } from './create-business-trip.dto';

export class UpdateBusinessTripDto extends PartialType(CreateBusinessTripDto) {}
