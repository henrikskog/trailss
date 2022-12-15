"use strict";
exports.__esModule = true;
exports.AuthedUser = void 0;
var common_1 = require("@nestjs/common");
exports.AuthedUser = (0, common_1.createParamDecorator)(function (data, ctx) {
    var request = ctx.switchToHttp().getRequest();
    return request.user;
});
