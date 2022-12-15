"use strict";
exports.__esModule = true;
exports.UpdateUserDto = void 0;
var openapi = require("@nestjs/swagger");
var UpdateUserDto = /** @class */ (function () {
    function UpdateUserDto() {
    }
    UpdateUserDto._OPENAPI_METADATA_FACTORY = function () {
        return { username: { required: true, type: function () { return String; } }, password: { required: true, type: function () { return String; } }, email: { required: true, type: function () { return String; } } };
    };
    return UpdateUserDto;
}());
exports.UpdateUserDto = UpdateUserDto;
