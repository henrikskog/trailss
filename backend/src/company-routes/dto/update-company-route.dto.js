"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.UpdateCompanyRouteDto = void 0;
var openapi = require("@nestjs/swagger");
var swagger_1 = require("@nestjs/swagger");
var create_company_route_dto_1 = require("./create-company-route.dto");
var UpdateCompanyRouteDto = /** @class */ (function (_super) {
    __extends(UpdateCompanyRouteDto, _super);
    function UpdateCompanyRouteDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UpdateCompanyRouteDto._OPENAPI_METADATA_FACTORY = function () {
        return { origin: { required: true, type: function () { return String; } }, destination: { required: true, type: function () { return String; } }, distance: { required: true, type: function () { return String; } }, emissions: { required: true, type: function () { return Number; } }, capacity: { required: true, type: function () { return Number; } }, employee: { required: true, type: function () { return Number; } }, date: { required: true, type: function () { return Date; } } };
    };
    return UpdateCompanyRouteDto;
}((0, swagger_1.PartialType)(create_company_route_dto_1.CreateCompanyRouteDto)));
exports.UpdateCompanyRouteDto = UpdateCompanyRouteDto;
