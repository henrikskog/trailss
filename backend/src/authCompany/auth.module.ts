import { Module } from "@nestjs/common"
import { AuthService } from './auth.service';
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { MongooseModule } from "@nestjs/mongoose"
import { LocalStrategy } from './local.auth';
import { JwtStrategy } from "./jwt.strategy";
import { CompanyModule } from "src/company/company.module";
import { CompanySchema } from "src/company/company.model";
import { ComapnyService } from "src/company/company.service";


@Module({
  imports: [CompanyModule, PassportModule, JwtModule.register({
    secret: "" + process.env.SECRET_KEY,
    signOptions: { expiresIn: '3600s' },
  }), MongooseModule.forFeature([{ name: "company", schema: CompanySchema }])],
  providers: [AuthService, ComapnyService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule { }