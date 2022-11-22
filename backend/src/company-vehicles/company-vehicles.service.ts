import { Injectable } from '@nestjs/common';
import { CreateCompanyVehicleDto } from './dto/create-company-vehicle.dto';
import { UpdateCompanyVehicleDto } from './dto/update-company-vehicle.dto';

@Injectable()
export class CompanyVehiclesService {
  create(createCompanyVehicleDto: CreateCompanyVehicleDto) {
    return 'This action adds a new companyVehicle';
  }

  findAll() {
    return `This action returns all companyVehicles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companyVehicle`;
  }

  update(id: number, updateCompanyVehicleDto: UpdateCompanyVehicleDto) {
    return `This action updates a #${id} companyVehicle`;
  }

  remove(id: number) {
    return `This action removes a #${id} companyVehicle`;
  }
}
