import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Company, CompanyDocument } from "./company.schema";
import { UpdateCompanyDto } from "./dto/update-company.dto";

@Injectable()
export class CompanyService{
    constructor(
        @InjectModel("company") private readonly companyModel: Model<CompanyDocument>
    ) {}

    async createCompany(companyName: string, password: string, email: string) {
        return this.companyModel.create({
          companyName,
          password,
          email
        });
      }
    
      async getCompanyById(id: string): Promise<Company> {
        const company = await this.companyModel.findById(id);
        return company;
      }
    
      async getCompanyByCompanyName(query: { companyname: string }): Promise<Company> {
        return this.companyModel.findOne(query);
      }
    
      async getCompanyByEmail(query: { email: string }): Promise<Company> {
        return this.companyModel.findOne(query);
      }
    
      getCompanyByToken(company: any) {
        return { companyname: company.companyname, email: company.email };
      }
    
      updateCompanyByToken(company: any, updateCompanyDto: UpdateCompanyDto) {
        if (!company) throw new NotFoundException("Company not found");
    
        this.companyModel.findByIdAndUpdate(company._id, updateCompanyDto);
        return "Company updated successfully";
      }
    
      removeCompanyByToken(company: any) {
        if (!company) throw new NotFoundException("Company not found");
    
        this.companyModel.findByIdAndRemove(company._id);
        return "Company removed successfully";
      }
}