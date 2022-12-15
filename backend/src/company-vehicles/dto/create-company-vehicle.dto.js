"use strict";
exports.__esModule = true;
exports.CreateCompanyVehicleDto = void 0;
var openapi = require("@nestjs/swagger");
var CreateCompanyVehicleDto = /** @class */ (function () {
    function CreateCompanyVehicleDto() {
    }
    CreateCompanyVehicleDto._OPENAPI_METADATA_FACTORY = function () {
        return { type: { required: true, type: function () { return String; } }, brand: { required: true, type: function () { return String; } }, model: { required: true, type: function () { return String; } }, emissions: { required: true, type: function () { return Number; } }, consumption: { required: true, type: function () { return Number; } }, capacity: { required: true, type: function () { return Number; } }, routes: { required: true, type: function () { return [Object]; } } };
    };
    return CreateCompanyVehicleDto;
}());
exports.CreateCompanyVehicleDto = CreateCompanyVehicleDto;
