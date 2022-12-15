"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var config_1 = require("@nestjs/config");
var users_module_1 = require("./users/users.module");
var trips_module_1 = require("./trips/trips.module");
var vehicles_module_1 = require("./vehicles/vehicles.module");
var auth_module_1 = require("./auth/auth.module");
var company_module_1 = require("./company/company.module");
var auth_company_module_1 = require("./authCompany/auth-company.module");
var company_routes_module_1 = require("./company-routes/company-routes.module");
var company_vehicles_module_1 = require("./company-vehicles/company-vehicles.module");
var fleets_module_1 = require("./fleets/fleets.module");
var createMongoConnectionString = function () { return "mongodb+srv://".concat(process.env.DB_USER, ":").concat(process.env.DB_PASSWORD, "@").concat(process.env.DB_CLUSTER_URL, "/halla?retryWrites=true&w=majority"); };
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot(),
                mongoose_1.MongooseModule.forRoot(createMongoConnectionString()),
                users_module_1.UsersModule,
                trips_module_1.TripsModule,
                vehicles_module_1.VehiclesModule,
                auth_module_1.AuthModule,
                auth_company_module_1.AuthCompanyModule,
                company_module_1.CompanyModule,
                fleets_module_1.FleetsModule,
                company_vehicles_module_1.CompanyVehiclesModule,
                company_routes_module_1.CompanyRoutesModule
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
