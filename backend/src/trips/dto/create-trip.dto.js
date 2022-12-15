"use strict";
exports.__esModule = true;
exports.CreateTripDto = void 0;
var openapi = require("@nestjs/swagger");
var CreateTripDto = /** @class */ (function () {
    function CreateTripDto() {
    }
    CreateTripDto._OPENAPI_METADATA_FACTORY = function () {
        return { origin: { required: true, type: function () { return String; } }, destination: { required: true, type: function () { return String; } }, distance: { required: true, type: function () { return Number; } }, total_emissions: { required: true, type: function () { return Number; } }, date: { required: true, type: function () { return Date; } }, passengers: { required: true, type: function () { return Number; } }, vehicle: { required: true, type: function () { return Object; } } };
    };
    return CreateTripDto;
}());
exports.CreateTripDto = CreateTripDto;
