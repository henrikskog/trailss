"use strict";
exports.__esModule = true;
exports.CreateVehicleDto = void 0;
var openapi = require("@nestjs/swagger");
var CreateVehicleDto = /** @class */ (function () {
    function CreateVehicleDto() {
    }
    CreateVehicleDto._OPENAPI_METADATA_FACTORY = function () {
        return { name: { required: false, type: function () { return String; } }, make: { required: true, type: function () { return String; } }, model: { required: true, type: function () { return String; } }, year: { required: true, type: function () { return Number; } }, consumptions: { required: false, type: function () { return Number; } }, fuelType: { required: false, type: function () { return String; } }, type: { required: true, type: function () { return String; } }, emissions: { required: true, type: function () { return Number; } }, capacity: { required: true, type: function () { return Number; } }, color: { required: true, type: function () { return String; } }, licensePlate: { required: true, type: function () { return String; } }, mileage: { required: true, type: function () { return Number; } }, status: { required: true, type: function () { return String; } } };
    };
    return CreateVehicleDto;
}());
exports.CreateVehicleDto = CreateVehicleDto;
