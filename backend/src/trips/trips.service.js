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
exports.TripsService = exports.vehicleFuelSchema = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var zod_1 = require("zod");
var trips_schema_1 = require("./trips.schema");
exports.vehicleFuelSchema = zod_1.z
    .literal("diesel")
    .or(zod_1.z.literal("petrol"))
    .or(zod_1.z.literal("LPG"));
var TripsService = /** @class */ (function () {
    function TripsService(vehicleService, tripModel) {
        this.vehicleService = vehicleService;
        this.tripModel = tripModel;
    }
    /**
     * Fetch the fuel consumption for a given car
     * Note: Gives the consumptions for the car with the minimum consumption should the API return multiple models
     *
     * Uses API: https://www.fueleconomy.gov/feg/ws/
     * @param distance The distance of the trip
     * @param make The make of the car used for the trip
     * @param model The model of the car used for the trip
     * @param year The year the car was made
     * @param consumption The consumption
     * @param fuelType The fuel type of the car
     * @returns The emissions of the trip given in grams of CO2
     */
    TripsService.prototype.calculateTripEmissions = function (distance, fuelType, make, model, year, consumption) {
        return __awaiter(this, void 0, void 0, function () {
            var consumptionMPG, fuel, emissions, tripEmssions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!consumption) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.vehicleService.fetchFuelConsumption(make, model, year)];
                    case 1:
                        consumptionMPG = _a.sent();
                        consumption = 235.214583 / consumptionMPG; // Constant to convert from MPG to l/100km
                        _a.label = 2;
                    case 2:
                        fuel = exports.vehicleFuelSchema.safeParse(fuelType);
                        // Fuel types are restricted, therefore validate value
                        if (!fuel.success) {
                            // TODO: fix zod here
                            throw new common_1.BadRequestException("Illegal value given for fuel type");
                        }
                        emissions = this.vehicleService.getEmissions(fuel.data, consumption);
                        tripEmssions = Math.round(emissions * distance * 10) / 10;
                        return [2 /*return*/, tripEmssions];
                }
            });
        });
    };
    TripsService.prototype.create = function (user, createTripDto) {
        return __awaiter(this, void 0, void 0, function () {
            var trip;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tripModel.create(createTripDto)];
                    case 1:
                        trip = _a.sent();
                        user.trips.push(trip);
                        user.save();
                        return [2 /*return*/, trip];
                }
            });
        });
    };
    TripsService.prototype.findAll = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var trips;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user.populate("trips").then(function (p) { return p.trips; })];
                    case 1:
                        trips = _a.sent();
                        return [2 /*return*/, trips];
                }
            });
        });
    };
    TripsService.prototype.findOne = function (user, id) {
        return __awaiter(this, void 0, void 0, function () {
            var trip;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user
                            .populate("trips", null, { _id: id })
                            .then(function (p) { return p.trips; })];
                    case 1:
                        trip = _a.sent();
                        if (!trip.length) {
                            throw new common_1.NotFoundException("No trip with the given arguments was found");
                        }
                        return [2 /*return*/, trip[0]];
                }
            });
        });
    };
    TripsService.prototype.update = function (tripsIds, id, updateTripDto) {
        return __awaiter(this, void 0, void 0, function () {
            var trip;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        trip = tripsIds.filter(function (trip) { return trip.toString() == id; });
                        if (!trip.length) {
                            throw new common_1.NotFoundException("No trip with the given id was found");
                        }
                        return [4 /*yield*/, this.tripModel.findByIdAndUpdate(trip[0], updateTripDto)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, "Trip updated successfully"];
                }
            });
        });
    };
    TripsService.prototype.remove = function (user, id) {
        return __awaiter(this, void 0, void 0, function () {
            var trip;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        trip = user.trips.filter(function (trip) { return trip.toString() == id; });
                        if (!trip.length) {
                            throw new common_1.NotFoundException("No trip with the given id was found");
                        }
                        user.trips.pull({ _id: trip[0] });
                        user.save();
                        return [4 /*yield*/, this.tripModel.findByIdAndDelete(trip[0])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, "Trip deleted successfully"];
                }
            });
        });
    };
    TripsService = __decorate([
        (0, common_1.Injectable)(),
        __param(1, (0, mongoose_1.InjectModel)(trips_schema_1.Trip.name))
    ], TripsService);
    return TripsService;
}());
exports.TripsService = TripsService;
