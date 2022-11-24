import { PartialType } from '@nestjs/swagger';
import { CreateCompanyVehicleDto } from './create-company-vehicle.dto';

export class UpdateCompanyVehicleDto extends PartialType(CreateCompanyVehicleDto) {}
