"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FleetsSchema = exports.Fleet = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var Fleet = /** @class */ (function () {
    function Fleet() {
    }
    __decorate([
        (0, mongoose_1.Prop)({ required: true })
    ], Fleet.prototype, "name");
    __decorate([
        (0, mongoose_1.Prop)({ "default": true })
    ], Fleet.prototype, "active");
    __decorate([
        (0, mongoose_1.Prop)({ type: [mongoose_2["default"].Schema.Types.ObjectId], ref: 'CompanyVehicle', "default": [] })
    ], Fleet.prototype, "vehicles");
    Fleet = __decorate([
        (0, mongoose_1.Schema)()
    ], Fleet);
    return Fleet;
}());
exports.Fleet = Fleet;
exports.FleetsSchema = mongoose_1.SchemaFactory.createForClass(Fleet);
