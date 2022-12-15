"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthCompanyModule = void 0;
var common_1 = require("@nestjs/common");
var auth_company_service_1 = require("./auth-company.service");
var passport_1 = require("@nestjs/passport");
var jwt_1 = require("@nestjs/jwt");
var auth_company_controller_1 = require("./auth-company.controller");
var mongoose_1 = require("@nestjs/mongoose");
var local_company_auth_1 = require("./local-company.auth");
var jwt_company_strategy_1 = require("./jwt-company.strategy");
var company_module_1 = require("../company/company.module");
var company_schema_1 = require("../company/company.schema");
var company_service_1 = require("../company/company.service");
var AuthCompanyModule = /** @class */ (function () {
    function AuthCompanyModule() {
    }
    AuthCompanyModule = __decorate([
        (0, common_1.Module)({
            imports: [company_module_1.CompanyModule, passport_1.PassportModule, jwt_1.JwtModule.register({
                    secret: "" + process.env.SECRET_KEY,
                    signOptions: { expiresIn: '3600s' }
                }), mongoose_1.MongooseModule.forFeature([{ name: "company", schema: company_schema_1.CompanySchema }])],
            providers: [auth_company_service_1.AuthCompanyService, company_service_1.CompanyService, local_company_auth_1.LocalCompanyStrategy, jwt_company_strategy_1.JwtCompanyStrategy],
            controllers: [auth_company_controller_1.AuthCompanyController]
        })
    ], AuthCompanyModule);
    return AuthCompanyModule;
}());
exports.AuthCompanyModule = AuthCompanyModule;
