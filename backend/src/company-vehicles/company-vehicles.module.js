"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CompanyVehiclesModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var company_vehicles_service_1 = require("./company-vehicles.service");
var company_vehicles_controller_1 = require("./company-vehicles.controller");
var company_vehicles_schema_1 = require("./company-vehicles.schema");
var CompanyVehiclesModule = /** @class */ (function () {
    function CompanyVehiclesModule() {
    }
    CompanyVehiclesModule = __decorate([
        (0, common_1.Module)({
            imports: [mongoose_1.MongooseModule.forFeature([{ name: company_vehicles_schema_1.CompanyVehicle.name, schema: company_vehicles_schema_1.CompanyVehiclesSchema }])],
            controllers: [company_vehicles_controller_1.CompanyVehiclesController],
            providers: [company_vehicles_service_1.CompanyVehiclesService],
            exports: [company_vehicles_service_1.CompanyVehiclesService, mongoose_1.MongooseModule]
        })
    ], CompanyVehiclesModule);
    return CompanyVehiclesModule;
}());
exports.CompanyVehiclesModule = CompanyVehiclesModule;
