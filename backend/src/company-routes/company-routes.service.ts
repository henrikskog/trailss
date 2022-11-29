import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from 'src/company/company.schema';
import { CreateCompanyRouteDto } from './dto/create-company-route.dto';
import { UpdateCompanyRouteDto } from './dto/update-company-route.dto';

@Injectable()
export class CompanyRoutesService {
  constructor(
    @InjectModel(Company.name) private readonly companyVehicleModel: Model<CompanyDocument>,
  ) { }

  create(createCompanyRouteDto: CreateCompanyRouteDto) {
    return 'This action adds a new companyRoute';
  }

  findAll() {
    return `This action returns all companyRoutes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companyRoute`;
  }

  update(id: number, updateCompanyRouteDto: UpdateCompanyRouteDto) {
    return `This action updates a #${id} companyRoute`;
  }

  remove(id: number) {
    return `This action removes a #${id} companyRoute`;
  }
}
