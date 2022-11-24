import { Module } from "@nestjs/common"
import { AuthCompanyService } from './auth-company.service';
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from '@nestjs/jwt';
import { AuthCompanyController } from './auth-company.controller';
import { MongooseModule } from "@nestjs/mongoose"
import { LocalCompanyStrategy } from './local-company.auth';
import { JwtCompanyStrategy } from "./jwt-company.strategy";
import { CompanyModule } from "src/company/company.module";
import { CompanySchema } from "src/company/company.schema";
import { CompanyService } from "src/company/company.service";


@Module({
  imports: [CompanyModule, PassportModule, JwtModule.register({
    secret: "" + process.env.SECRET_KEY,
    signOptions: { expiresIn: '3600s' },
  }), MongooseModule.forFeature([{ name: "company", schema: CompanySchema }])],
  providers: [AuthCompanyService, CompanyService, LocalCompanyStrategy, JwtCompanyStrategy],
  controllers: [AuthCompanyController],
})
export class AuthCompanyModule { }