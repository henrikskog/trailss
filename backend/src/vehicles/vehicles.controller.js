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
exports.VehiclesController = void 0;
var openapi = require("@nestjs/swagger");
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var jwt_auth_guard_guard_1 = require("../auth/jwt-auth-guard.guard");
var VehiclesController = /** @class */ (function () {
    function VehiclesController(vehiclesService) {
        this.vehiclesService = vehiclesService;
    }
    VehiclesController.prototype.create = function (req, createVehicleDto) {
        return this.vehiclesService.create(req.user, createVehicleDto);
    };
    VehiclesController.prototype.findAll = function (req) {
        return this.vehiclesService.findAll(req.user);
    };
    VehiclesController.prototype.findOne = function (req, id) {
        return this.vehiclesService.findOne(req.user, id);
    };
    VehiclesController.prototype.update = function (req, id, updateVehicleDto) {
        return this.vehiclesService.update(req.user.vehicles, id, updateVehicleDto);
    };
    VehiclesController.prototype.remove = function (req, id) {
        return this.vehiclesService.remove(req.user, id);
    };
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_guard_1.JwtAuthGuard),
        (0, common_1.Post)(),
        (0, swagger_1.ApiBearerAuth)(),
        openapi.ApiResponse({ status: 201, type: Object }),
        __param(0, (0, common_1.Request)()),
        __param(1, (0, common_1.Body)())
    ], VehiclesController.prototype, "create");
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_guard_1.JwtAuthGuard),
        (0, common_1.Get)(),
        (0, swagger_1.ApiBearerAuth)(),
        openapi.ApiResponse({ status: 200, type: Object }),
        __param(0, (0, common_1.Request)())
    ], VehiclesController.prototype, "findAll");
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_guard_1.JwtAuthGuard),
        (0, common_1.Get)(":id"),
        (0, swagger_1.ApiBearerAuth)(),
        openapi.ApiResponse({ status: 200, type: Object }),
        __param(0, (0, common_1.Request)()),
        __param(1, (0, common_1.Param)("id"))
    ], VehiclesController.prototype, "findOne");
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_guard_1.JwtAuthGuard),
        (0, common_1.Patch)(":id"),
        (0, swagger_1.ApiBearerAuth)(),
        openapi.ApiResponse({ status: 200, type: Object }),
        __param(0, (0, common_1.Request)()),
        __param(1, (0, common_1.Param)("id")),
        __param(2, (0, common_1.Body)())
    ], VehiclesController.prototype, "update");
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_guard_1.JwtAuthGuard),
        (0, common_1.Delete)(":id"),
        (0, swagger_1.ApiBearerAuth)(),
        openapi.ApiResponse({ status: 200, type: Object }),
        __param(0, (0, common_1.Request)()),
        __param(1, (0, common_1.Param)("id"))
    ], VehiclesController.prototype, "remove");
    VehiclesController = __decorate([
        (0, swagger_1.ApiTags)("Vehicles"),
        (0, common_1.Controller)("vehicles")
    ], VehiclesController);
    return VehiclesController;
}());
exports.VehiclesController = VehiclesController;
