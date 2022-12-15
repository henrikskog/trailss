"use strict";
exports.__esModule = true;
exports.CreateCompanyDto = void 0;
var openapi = require("@nestjs/swagger");
var CreateCompanyDto = /** @class */ (function () {
    function CreateCompanyDto() {
    }
    CreateCompanyDto._OPENAPI_METADATA_FACTORY = function () {
        return { name: { required: true, type: function () { return String; } }, password: { required: true, type: function () { return String; } }, email: { required: true, type: function () { return String; } }, fleet: { required: true, type: function () { return Number; } }, subscription_start: { required: true, type: function () { return Date; } }, subscription_type: { required: true, type: function () { return String; } }, subscription: { required: true, type: function () { return Number; } }, company_trips: { required: true, type: function () { return [Object]; } } };
    };
    return CreateCompanyDto;
}());
exports.CreateCompanyDto = CreateCompanyDto;
