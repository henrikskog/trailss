"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VehiclesModule = void 0;
var axios_1 = require("@nestjs/axios");
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var trips_module_1 = require("../trips/trips.module");
var users_module_1 = require("../users/users.module");
var vehicles_controller_1 = require("./vehicles.controller");
var vehicles_schema_1 = require("./vehicles.schema");
var vehicles_service_1 = require("./vehicles.service");
var VehiclesModule = /** @class */ (function () {
    function VehiclesModule() {
    }
    VehiclesModule = __decorate([
        (0, common_1.Module)({
            imports: [
                axios_1.HttpModule,
                (0, common_1.forwardRef)(function () { return users_module_1.UsersModule; }),
                (0, common_1.forwardRef)(function () { return trips_module_1.TripsModule; }),
                mongoose_1.MongooseModule.forFeature([
                    { name: vehicles_schema_1.Vehicle.name, schema: vehicles_schema_1.VehicleSchema },
                ]),
            ],
            providers: [vehicles_service_1.VehiclesService],
            controllers: [vehicles_controller_1.VehiclesController],
            exports: [vehicles_service_1.VehiclesService, mongoose_1.MongooseModule]
        })
    ], VehiclesModule);
    return VehiclesModule;
}());
exports.VehiclesModule = VehiclesModule;
