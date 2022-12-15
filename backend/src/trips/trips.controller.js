"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.TripsController = void 0;
var openapi = require("@nestjs/swagger");
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var swagger_2 = require("@nestjs/swagger");
var jwt_auth_guard_guard_1 = require("../auth/jwt-auth-guard.guard");
var TripsController = /** @class */ (function () {
    function TripsController(tripsService) {
        this.tripsService = tripsService;
    }
    TripsController.prototype.calculateEmissions = function (distance, fuelType, make, model, year, consumptions) {
        return this.tripsService.calculateTripEmissions(distance, fuelType, make, model, year, consumptions);
    };
    TripsController.prototype.create = function (req, createTripDto) {
        return this.tripsService.create(req.user, createTripDto);
    };
    TripsController.prototype.findAll = function (req) {
        return this.tripsService.findAll(req.user);
    };
    TripsController.prototype.findOne = function (req, id) {
        return this.tripsService.findOne(req.user, id);
    };
    TripsController.prototype.update = function (req, id, updateTripDto) {
        return this.tripsService.update(req.user.trips, id, updateTripDto);
    };
    TripsController.prototype.remove = function (req, id) {
        return this.tripsService.remove(req.user, id);
    };
    __decorate([
        (0, common_1.Get)("calculate")
        /**
         * Conditions for endpoint
         * - (Consumption) is not compatible with (car-make, car-model and car-model-year)
         */
        ,
        (0, swagger_1.ApiQuery)({ name: "distance", required: true, description: "Distance for the trip given in km" }),
        (0, swagger_1.ApiQuery)({ name: "fuel-type", required: true, description: "Type of fuel. (diesel, petrol, LPG)" }),
        (0, swagger_1.ApiQuery)({ name: "car-make", required: false, description: "E.g. volvo" }),
        (0, swagger_1.ApiQuery)({ name: "car-model", required: false, description: "E.g. XC90" }),
        (0, swagger_1.ApiQuery)({ name: "car-model-year", required: false, description: "E.g. 2020" }),
        (0, swagger_1.ApiQuery)({ name: "consumptions", required: false, description: "Liters fuel per kilometer (L/km)" }),
        (0, swagger_1.ApiOperation)({ summary: "Recieve the emissions of a trip" }),
        (0, swagger_1.ApiResponse)({ status: 200, description: "Grams CO2" }),
        openapi.ApiResponse({ status: 200, type: Number }),
        __param(0, (0, common_1.Query)("distance", common_1.ParseIntPipe)),
        __param(1, (0, common_1.Query)("fuel-type")),
        __param(2, (0, common_1.Query)("car-make")),
        __param(3, (0, common_1.Query)("car-model")),
        __param(4, (0, common_1.Query)("car-model-year")),
        __param(5, (0, common_1.Query)("consumptions"))
    ], TripsController.prototype, "calculateEmissions");
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_guard_1.JwtAuthGuard),
        (0, common_1.Post)(),
        (0, swagger_1.ApiBearerAuth)(),
        openapi.ApiResponse({ status: 201, type: Object }),
        __param(0, (0, common_1.Request)()),
        __param(1, (0, common_1.Body)())
    ], TripsController.prototype, "create");
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_guard_1.JwtAuthGuard),
        (0, common_1.Get)(),
        (0, swagger_1.ApiBearerAuth)(),
        openapi.ApiResponse({ status: 200, type: Object }),
        __param(0, (0, common_1.Request)())
    ], TripsController.prototype, "findAll");
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_guard_1.JwtAuthGuard),
        (0, common_1.Get)(":id"),
        (0, swagger_1.ApiBearerAuth)(),
        openapi.ApiResponse({ status: 200, type: Object }),
        __param(0, (0, common_1.Request)()),
        __param(1, (0, common_1.Param)("id"))
    ], TripsController.prototype, "findOne");
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_guard_1.JwtAuthGuard),
        (0, common_1.Patch)(":id"),
        (0, swagger_1.ApiBearerAuth)(),
        openapi.ApiResponse({ status: 200, type: String }),
        __param(0, (0, common_1.Request)()),
        __param(1, (0, common_1.Param)("id")),
        __param(2, (0, common_1.Body)())
    ], TripsController.prototype, "update");
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_guard_1.JwtAuthGuard),
        (0, common_1.Delete)(":id"),
        (0, swagger_1.ApiBearerAuth)(),
        openapi.ApiResponse({ status: 200, type: String }),
        __param(0, (0, common_1.Request)()),
        __param(1, (0, common_1.Param)("id"))
    ], TripsController.prototype, "remove");
    TripsController = __decorate([
        (0, swagger_2.ApiTags)('Trips'),
        (0, common_1.Controller)("trips")
    ], TripsController);
    return TripsController;
}());
exports.TripsController = TripsController;
