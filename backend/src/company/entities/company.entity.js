"use strict";
exports.__esModule = true;
exports.CompanyEntity = void 0;
var openapi = require("@nestjs/swagger");
var CompanyEntity = /** @class */ (function () {
    function CompanyEntity() {
    }
    CompanyEntity._OPENAPI_METADATA_FACTORY = function () {
        return { name: { required: true, type: function () { return String; } }, email: { required: true, type: function () { return String; } } };
    };
    return CompanyEntity;
}());
exports.CompanyEntity = CompanyEntity;
