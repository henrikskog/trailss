"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CompanySchema = exports.Company = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var Company = /** @class */ (function () {
    function Company() {
    }
    __decorate([
        (0, mongoose_1.Prop)()
    ], Company.prototype, "name");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Company.prototype, "password");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Company.prototype, "email");
    __decorate([
        (0, mongoose_1.Prop)({ type: [mongoose_2["default"].Schema.Types.ObjectId], ref: 'Fleet', "default": [] })
    ], Company.prototype, "fleets");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Company.prototype, "subscription_start");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Company.prototype, "subscription_type");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Company.prototype, "subscription");
    __decorate([
        (0, mongoose_1.Prop)({ type: [mongoose_2["default"].Schema.Types.ObjectId], ref: 'Trip', "default": [] })
    ], Company.prototype, "company_trips");
    Company = __decorate([
        (0, mongoose_1.Schema)()
    ], Company);
    return Company;
}());
exports.Company = Company;
exports.CompanySchema = mongoose_1.SchemaFactory.createForClass(Company);
