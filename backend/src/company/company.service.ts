import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Company, CompanyDocument } from "./company.model";
import { UpdateCompanyDto } from "./dto/update-company.dto";

@Injectable()
export class ComapnyService{
    constructor(
        @InjectModel("company") private readonly companyModel: Model<CompanyDocument>
    ) {}

    async createUser(companyName: string, password: string, email: string) {
        return this.companyModel.create({
          companyName,
          password,
          email
        });
      }
    
      async getUserById(id: string): Promise<Company> {
        const user = await this.companyModel.findById(id);
        return user;
      }
    
      async getUserByUserName(query: { companyName: string }): Promise<Company> {
        return this.companyModel.findOne(query);
      }
    
      async getUserByEmail(query: { email: string }): Promise<Company> {
        return this.companyModel.findOne(query);
      }
    
      getUserByToken(user: any) {
        return { username: user.username, email: user.email };
      }
    
      updateUserByToken(company: any, updateCompanyDto: UpdateCompanyDto) {
        if (!company) throw new NotFoundException("User not found");
    
        this.companyModel.findByIdAndUpdate(company._id, updateCompanyDto);
        return "User updated successfully";
      }
    
      removeUserByToken(company: any) {
        if (!company) throw new NotFoundException("User not found");
    
        this.companyModel.findByIdAndRemove(company._id);
        return "User removed successfully";
      }
}