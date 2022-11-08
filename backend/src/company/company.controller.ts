import { Controller, Post, Body, UseGuards, Get, Patch, Delete, Request } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ComapnyService } from "./company.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { CompanyEntity } from "./entities/company.entity";

@ApiTags('Company')
@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: ComapnyService) { }

    @Post('/register')
    async createcompany(
        @Body() company: CreateCompanyDto
    ): Promise<CompanyEntity> {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(company.password, saltOrRounds);

        // strip away password from returned company
        // TODO: look if this sends correct HTTP response on failure
        await this.companyService.createcompany(
            company.name,
            hashedPassword,
            company.email
        );

        return {companyname: company.name, email: company.email};
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    @ApiBearerAuth()
    getcompanyByToken(@Request() req: any) {
        return this.companyService.getcompanyByToken(req.company)
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch()
    @ApiBearerAuth()
    updatecompanyByToken(@Request() req: any, @Body() updatecompanyDto: UpdateCompanyDto) {
        return this.companyService.updatecompanyByToken(req.company, updatecompanyDto)
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete()
    @ApiBearerAuth()
    remove(@Request() req: any) {
    return this.companyService.removecompanyByToken(req.company);
  }
}