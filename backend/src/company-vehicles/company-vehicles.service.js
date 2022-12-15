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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.CompanyVehiclesService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var company_vehicles_schema_1 = require("./company-vehicles.schema");
var CompanyVehiclesService = /** @class */ (function () {
    function CompanyVehiclesService(companyVehicleModel) {
        this.companyVehicleModel = companyVehicleModel;
    }
    CompanyVehiclesService.prototype.getFleet = function (company, id) {
        return __awaiter(this, void 0, void 0, function () {
            var fleet, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, company.populate("fleets", null, { _id: id }).then(function (p) { return p.fleets; })];
                    case 1:
                        fleet = _b.sent();
                        if (!fleet.length) {
                            throw new common_1.NotFoundException("No fleet with the given id was found");
                        }
                        return [2 /*return*/, fleet[0]];
                    case 2:
                        _a = _b.sent();
                        throw new common_1.NotFoundException("No fleet with the given arguments was found");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CompanyVehiclesService.prototype.create = function (company, fleetId, createCompanyVehicleDto) {
        return __awaiter(this, void 0, void 0, function () {
            var fleet, vehicle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getFleet(company, fleetId)];
                    case 1:
                        fleet = _a.sent();
                        console.log(fleet);
                        return [4 /*yield*/, this.companyVehicleModel.create(createCompanyVehicleDto)];
                    case 2:
                        vehicle = _a.sent();
                        fleet.vehicles.push(vehicle);
                        fleet.save();
                        return [2 /*return*/, "Added a new vehicle to the fleet"];
                }
            });
        });
    };
    CompanyVehiclesService.prototype.findAll = function (company, fleetId) {
        return __awaiter(this, void 0, void 0, function () {
            var fleet, vehicles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getFleet(company, fleetId)];
                    case 1:
                        fleet = _a.sent();
                        return [4 /*yield*/, fleet.populate("vehicles").then(function (p) { return p.vehicles; })];
                    case 2:
                        vehicles = _a.sent();
                        return [2 /*return*/, vehicles];
                }
            });
        });
    };
    CompanyVehiclesService.prototype.findOne = function (company, fleetId, id) {
        return __awaiter(this, void 0, void 0, function () {
            var fleet, vehicle, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getFleet(company, fleetId)];
                    case 1:
                        fleet = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, fleet.populate("vehicles", null, { _id: id }).then(function (p) { return p.vehicles; })];
                    case 3:
                        vehicle = _b.sent();
                        if (!vehicle.length) {
                            throw new common_1.NotFoundException("No car with the given arguments was found");
                        }
                        return [2 /*return*/, vehicle[0]];
                    case 4:
                        _a = _b.sent();
                        throw new common_1.NotFoundException("No car with the given arguments was found");
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CompanyVehiclesService.prototype.update = function (company, fleetId, id, updateCompanyVehicleDto) {
        return __awaiter(this, void 0, void 0, function () {
            var fleet, vehicle, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getFleet(company, fleetId)];
                    case 1:
                        fleet = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        vehicle = fleet.vehicles.filter(function (vehicle) { return vehicle.toString() == id; });
                        if (!vehicle.length)
                            throw new common_1.NotFoundException("No car with the given id was found");
                        return [4 /*yield*/, this.companyVehicleModel.findByIdAndUpdate(vehicle[0], updateCompanyVehicleDto)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, "Vehicle updated successfully"];
                    case 4:
                        _a = _b.sent();
                        throw new common_1.NotFoundException("No car with the given arguments was found");
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CompanyVehiclesService.prototype.remove = function (company, fleetId, id) {
        return __awaiter(this, void 0, void 0, function () {
            var fleet, vehicle, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getFleet(company, fleetId)];
                    case 1:
                        fleet = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        vehicle = fleet.vehicles.filter(function (vehicle) { return vehicle.toString() == id; });
                        if (!vehicle.length) {
                            throw new common_1.NotFoundException("No vehicle with the given id was found");
                        }
                        fleet.vehicles.pull({ _id: vehicle[0] });
                        fleet.save();
                        return [4 /*yield*/, this.companyVehicleModel.findByIdAndDelete(vehicle[0])];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, "Vehicle removed successfully"];
                    case 4:
                        _a = _b.sent();
                        throw new common_1.NotFoundException("No car with the given arguments was found");
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CompanyVehiclesService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, mongoose_1.InjectModel)(company_vehicles_schema_1.CompanyVehicle.name))
    ], CompanyVehiclesService);
    return CompanyVehiclesService;
}());
exports.CompanyVehiclesService = CompanyVehiclesService;
