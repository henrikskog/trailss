import { Injectable, NotAcceptableException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { ComapnyService } from "src/company/company.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly companyService: ComapnyService,
    private jwtService: JwtService
  ) {}

  async validateCompany(firstparam: string, password: string): Promise<any> {
    let company = await this.companyService.getCompanyByCompanyName({ companyname:  firstparam});    
    if (!company) company = await this.companyService.getCompanyByEmail({ email: firstparam});
    if (!company) {
      throw new NotAcceptableException("could not find the company");
    }

    const passwordValid = await bcrypt.compare(password, company.password);

    if (company && passwordValid) {
      return company;
    }

    return null;
  }

  async login(company: any) {
    const payload = { companyname: company.username, sub: company._id };
    return {
      access_token: this.jwtService.sign(payload, {secret: `${process.env.SECRET_KEY}`}),
    };
  }
}
