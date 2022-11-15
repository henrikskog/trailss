import { Controller, Post, Body, UseGuards, Get, Patch, Delete, Request } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { ComapnyService } from "./company.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { CompanyEntity } from "./entities/company.entity";
import * as bcrypt from 'bcrypt';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: ComapnyService) { }

    //fake register
    @Post('/register')
    async createCompany(
        @Body() company: CreateCompanyDto
    ): Promise<CompanyEntity> {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(company.password, saltOrRounds);

        await this.companyService.createCompany(
            company.name,
            hashedPassword,
            company.email
        );

        return {companyname: company.name, email: company.email};
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    @ApiBearerAuth()
    getCompanyByToken(@Request() req: any) {
        return this.companyService.getCompanyByToken(req.company)
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch()
    @ApiBearerAuth()
    updateCompanyByToken(@Request() req: any, @Body() updatecompanyDto: UpdateCompanyDto) {
        return this.companyService.updateCompanyByToken(req.company, updatecompanyDto)
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete()
    @ApiBearerAuth()
    remove(@Request() req: any) {
    return this.companyService.removeCompanyByToken(req.company);
  }
}