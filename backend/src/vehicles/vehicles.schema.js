"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VehicleSchema = exports.Vehicle = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var Vehicle = /** @class */ (function () {
    function Vehicle() {
    }
    __decorate([
        (0, mongoose_1.Prop)()
    ], Vehicle.prototype, "name");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Vehicle.prototype, "type");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Vehicle.prototype, "make");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Vehicle.prototype, "model");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Vehicle.prototype, "year");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Vehicle.prototype, "emissions");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Vehicle.prototype, "capacity");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Vehicle.prototype, "color");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Vehicle.prototype, "licensePlate");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Vehicle.prototype, "mileage");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Vehicle.prototype, "status");
    Vehicle = __decorate([
        (0, mongoose_1.Schema)()
    ], Vehicle);
    return Vehicle;
}());
exports.Vehicle = Vehicle;
exports.VehicleSchema = mongoose_1.SchemaFactory.createForClass(Vehicle);
