"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TripsModule = void 0;
var common_1 = require("@nestjs/common");
var trips_service_1 = require("./trips.service");
var trips_controller_1 = require("./trips.controller");
var mongoose_1 = require("@nestjs/mongoose");
var vehicles_module_1 = require("../vehicles/vehicles.module");
var trips_schema_1 = require("./trips.schema");
var TripsModule = /** @class */ (function () {
    function TripsModule() {
    }
    TripsModule = __decorate([
        (0, common_1.Module)({
            imports: [
                (0, common_1.forwardRef)(function () { return vehicles_module_1.VehiclesModule; }),
                mongoose_1.MongooseModule.forFeature([{ name: trips_schema_1.Trip.name, schema: trips_schema_1.TripSchema }]),
            ],
            providers: [trips_service_1.TripsService],
            controllers: [trips_controller_1.TripsController],
            exports: [trips_service_1.TripsService, mongoose_1.MongooseModule]
        })
    ], TripsModule);
    return TripsModule;
}());
exports.TripsModule = TripsModule;
