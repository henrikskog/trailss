"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CompanyRoutesModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var company_routes_service_1 = require("./company-routes.service");
var company_routes_controller_1 = require("./company-routes.controller");
var company_routes_schema_1 = require("./company-routes.schema");
var CompanyRoutesModule = /** @class */ (function () {
    function CompanyRoutesModule() {
    }
    CompanyRoutesModule = __decorate([
        (0, common_1.Module)({
            imports: [mongoose_1.MongooseModule.forFeature([{ name: "companyRoutes", schema: company_routes_schema_1.CompanyRoutesSchema }])],
            controllers: [company_routes_controller_1.CompanyRoutesController],
            providers: [company_routes_service_1.CompanyRoutesService],
            exports: [company_routes_service_1.CompanyRoutesService, mongoose_1.MongooseModule]
        })
    ], CompanyRoutesModule);
    return CompanyRoutesModule;
}());
exports.CompanyRoutesModule = CompanyRoutesModule;
