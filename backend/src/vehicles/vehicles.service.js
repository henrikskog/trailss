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
exports.VehiclesService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var rxjs_1 = require("rxjs");
var trips_schema_1 = require("../trips/trips.schema");
var vehicles_schema_1 = require("./vehicles.schema");
var VehiclesService = /** @class */ (function () {
    function VehiclesService(httpService, vehicleModel, tripModel) {
        this.httpService = httpService;
        this.vehicleModel = vehicleModel;
        this.tripModel = tripModel;
    }
    VehiclesService.prototype.create = function (user, createVehicleDto) {
        return __awaiter(this, void 0, void 0, function () {
            var vehicle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.vehicleModel.create(createVehicleDto)];
                    case 1:
                        vehicle = _a.sent();
                        user.vehicles.push(vehicle);
                        user.save();
                        return [2 /*return*/, vehicle];
                }
            });
        });
    };
    VehiclesService.prototype.findAll = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var vehicles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user.populate("vehicles").then(function (p) { return p.vehicles; })];
                    case 1:
                        vehicles = _a.sent();
                        return [2 /*return*/, vehicles];
                }
            });
        });
    };
    VehiclesService.prototype.findOne = function (user, id) {
        return __awaiter(this, void 0, void 0, function () {
            var vehicle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user.populate("vehicles", null, { _id: id }).then(function (p) { return p.vehicles; })];
                    case 1:
                        vehicle = _a.sent();
                        if (!vehicle.length) {
                            throw new common_1.NotFoundException("No car with the given arguments was found");
                        }
                        return [2 /*return*/, vehicle[0]];
                }
            });
        });
    };
    VehiclesService.prototype.update = function (vehicleIds, id, updateVehicleDto) {
        return __awaiter(this, void 0, void 0, function () {
            var vehicle, updatedVehicle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vehicle = vehicleIds.filter(function (vehicle) { return vehicle.toString() == id; });
                        if (!vehicle.length)
                            throw new common_1.NotFoundException("No car with the given id was found");
                        return [4 /*yield*/, this.vehicleModel.findByIdAndUpdate(vehicle[0], updateVehicleDto)];
                    case 1:
                        updatedVehicle = _a.sent();
                        return [2 /*return*/, updatedVehicle];
                }
            });
        });
    };
    VehiclesService.prototype.remove = function (user, id) {
        return __awaiter(this, void 0, void 0, function () {
            var vehicle, removedVehicle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vehicle = user.vehicles.filter(function (vehicle) { return vehicle.toString() == id; });
                        if (!vehicle.length) {
                            throw new common_1.NotFoundException("No vehicle with the given id was found");
                        }
                        user.vehicles.pull({ _id: vehicle[0] });
                        user.save();
                        return [4 /*yield*/, this.vehicleModel.findByIdAndDelete(vehicle[0])];
                    case 1:
                        removedVehicle = _a.sent();
                        return [2 /*return*/, removedVehicle];
                }
            });
        });
    };
    /**
     * Fetch the fuel consumption for a given car
     * Note: Gives the consumptions for the car with the minimum consumption should the API return multiple models
     * Uses API: https://www.fueleconomy.gov/feg/ws/
     * @param make
     * @param model
     */
    VehiclesService.prototype.fetchFuelConsumption = function (make, model, year) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var apiRoot, carsUrl, carsResponse, cars, vehicleId, carInfoUrl, promiseId, car, emissions;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        apiRoot = "https://www.fueleconomy.gov/";
                        carsUrl = "ws/rest/vehicle/menu/options?year=".concat(year, "&make=").concat(make, "&model=").concat(model);
                        carsResponse = this.httpService.get(apiRoot + carsUrl);
                        return [4 /*yield*/, (0, rxjs_1.lastValueFrom)(carsResponse)];
                    case 1:
                        cars = _d.sent();
                        vehicleId = (_b = (_a = cars.data) === null || _a === void 0 ? void 0 : _a.menuItem[0]) === null || _b === void 0 ? void 0 : _b.value;
                        if (!vehicleId) {
                            throw new common_1.NotFoundException("No car with the given arguments was found");
                        }
                        carInfoUrl = "ws/rest/vehicle/".concat(vehicleId);
                        promiseId = this.httpService.get(apiRoot + carInfoUrl);
                        return [4 /*yield*/, (0, rxjs_1.lastValueFrom)(promiseId)];
                    case 2:
                        car = _d.sent();
                        emissions = (_c = car.data) === null || _c === void 0 ? void 0 : _c.comb08;
                        if (!emissions) {
                            throw new common_1.NotFoundException("There was an error handling data from the CAR API");
                        }
                        return [2 /*return*/, Number(emissions)];
                }
            });
        });
    };
    /**
     * Get the CO2 emmisions
     * @param fuelType Type of fuel
     * @param consumption The average fuel consumption per 100km
     * @returns Grams of CO2 emitted per km
     */
    VehiclesService.prototype.getEmissions = function (fuelType, consumption) {
        //         Diesel:
        //         1 liter of diesel weighs 835 grammes. Diesel consist for 86,2% of carbon, or 720 grammes of carbon per liter diesel. In order to combust this carbon to CO2, 1920 grammes of oxygen is needed. The sum is then 720 + 1920 = 2640 grammes of CO2/liter diesel.
        //         An average consumption of 5 liters/100 km then corresponds to 5 l x 2640 g/l / 100 (per km) = 132 g CO2/km.
        if (fuelType === "diesel")
            return (consumption * 2640) / 100;
        //         Petrol:
        //         1 liter of petrol weighs 750 grammes. Petrol consists for 87% of carbon, or 652 grammes of carbon per liter of petrol. In order to combust this carbon to CO2, 1740 grammes of oxygen is needed. The sum is then 652 + 1740 = 2392 grammes of CO2/liter of petrol.
        //         An average consumption of 5 liters/100 km then corresponds to 5 l x 2392 g/l / 100 (per km) = 120 g CO2/km.
        if (fuelType === "petrol")
            return (consumption * 2392) / 100;
        //         LPG:
        //         1 liter of LPG weighs 550 grammes. LPG consists for 82,5% of carbon, or 454 grammes of carbon per liter of LPG. In order to combust this carbon to CO2, 1211 grammes of oxygen is needed. The sum is then 454 + 1211 = 1665 grammes of CO2/liter of LPG.
        //         An average consumption of 5 liters / 100 km then corresponds to 5 l x 1665 g/l / 100 (per km) = 83 g of CO2/km.
        if (fuelType === "LPG")
            return (consumption * 1665) / 100;
    };
    VehiclesService = __decorate([
        (0, common_1.Injectable)(),
        __param(1, (0, mongoose_1.InjectModel)(vehicles_schema_1.Vehicle.name)),
        __param(2, (0, mongoose_1.InjectModel)(trips_schema_1.Trip.name))
    ], VehiclesService);
    return VehiclesService;
}());
exports.VehiclesService = VehiclesService;
