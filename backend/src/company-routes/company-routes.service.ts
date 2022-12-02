import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from 'src/company/company.schema';
import { CompanyRoute, CompanyRouteDocument } from './company-routes.schema';

@Injectable()
export class CompanyRoutesService {
  constructor(
    @InjectModel(Company.name) private readonly companyVehicleModel: Model<CompanyDocument>,
    @InjectModel(CompanyRoute.name) private readonly companyRouteModel: Model<CompanyRouteDocument>
  ) { }

  findAll() {
    return this.companyRouteModel.find();
  }

  findOne(id: string) {
    return this.companyRouteModel.findById(id);
  }
}
