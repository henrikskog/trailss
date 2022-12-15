"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthModule = void 0;
var common_1 = require("@nestjs/common");
var users_module_1 = require("../users/users.module");
var auth_service_1 = require("./auth.service");
var passport_1 = require("@nestjs/passport");
var jwt_1 = require("@nestjs/jwt");
var auth_controller_1 = require("./auth.controller");
var users_service_1 = require("../users/users.service");
var mongoose_1 = require("@nestjs/mongoose");
var users_schema_1 = require("../users/users.schema");
var local_auth_1 = require("./local.auth");
var jwt_strategy_1 = require("./jwt.strategy");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        (0, common_1.Module)({
            imports: [
                users_module_1.UsersModule,
                passport_1.PassportModule,
                jwt_1.JwtModule.register({
                    secret: "" + process.env.SECRET_KEY,
                    signOptions: { expiresIn: "3600s" }
                }),
                mongoose_1.MongooseModule.forFeature([{ name: "user", schema: users_schema_1.UserSchema }]),
            ],
            providers: [auth_service_1.AuthService, users_service_1.UsersService, local_auth_1.LocalStrategy, jwt_strategy_1.JwtStrategy],
            controllers: [auth_controller_1.AuthController]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
