"use strict";
exports.__esModule = true;
exports.TemplateCompanyRoute = void 0;
var openapi = require("@nestjs/swagger");
var TemplateCompanyRoute = /** @class */ (function () {
    function TemplateCompanyRoute() {
    }
    TemplateCompanyRoute._OPENAPI_METADATA_FACTORY = function () {
        return { origin: { required: true, type: function () { return String; } }, destination: { required: true, type: function () { return String; } }, distance: { required: true, type: function () { return String; } }, emissions: { required: true, type: function () { return Number; } }, capacity: { required: true, type: function () { return Number; } }, employee: { required: true, type: function () { return Number; } }, date: { required: true, type: function () { return Date; } }, frequency: { required: true, type: function () { return [String]; } } };
    };
    return TemplateCompanyRoute;
}());
exports.TemplateCompanyRoute = TemplateCompanyRoute;
