"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.CompanyVehiclesController = void 0;
var openapi = require("@nestjs/swagger");
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var jwt_auth_guard_company_guard_1 = require("../authCompany/jwt-auth-guard-company.guard");
var CompanyVehiclesController = /** @class */ (function () {
    function CompanyVehiclesController(companyVehiclesService) {
        this.companyVehiclesService = companyVehiclesService;
    }
    CompanyVehiclesController.prototype.create = function (req, fleetId, createCompanyVehicleDto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.companyVehiclesService.create(req.user, fleetId, createCompanyVehicleDto)];
            });
        });
    };
    CompanyVehiclesController.prototype.findAll = function (req, fleetId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.companyVehiclesService.findAll(req.user, fleetId)];
            });
        });
    };
    CompanyVehiclesController.prototype.findOne = function (req, fleetId, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.companyVehiclesService.findOne(req.user, fleetId, id)];
            });
        });
    };
    CompanyVehiclesController.prototype.update = function (req, fleetId, id, updateCompanyVehicleDto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.companyVehiclesService.update(req.user, fleetId, id, updateCompanyVehicleDto)];
            });
        });
    };
    CompanyVehiclesController.prototype.remove = function (req, fleetId, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.companyVehiclesService.remove(req.user, fleetId, id)];
            });
        });
    };
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_company_guard_1.JwtCompanyAuthGuard),
        (0, common_1.Post)(':fleetid'),
        (0, swagger_1.ApiBearerAuth)(),
        openapi.ApiResponse({ status: 201, type: String }),
        __param(0, (0, common_1.Request)()),
        __param(1, (0, common_1.Param)("fleetid")),
        __param(2, (0, common_1.Body)())
    ], CompanyVehiclesController.prototype, "create");
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_company_guard_1.JwtCompanyAuthGuard),
        (0, common_1.Get)(':fleetid'),
        (0, swagger_1.ApiBearerAuth)(),
        openapi.ApiResponse({ status: 200, type: Object }),
        __param(0, (0, common_1.Request)()),
        __param(1, (0, common_1.Param)("fleetid"))
    ], CompanyVehiclesController.prototype, "findAll");
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_company_guard_1.JwtCompanyAuthGuard),
        (0, common_1.Get)('/:fleetid/:id'),
        (0, swagger_1.ApiBearerAuth)(),
        openapi.ApiResponse({ status: 200, type: Object }),
        __param(0, (0, common_1.Request)()),
        __param(1, (0, common_1.Param)("fleetid")),
        __param(2, (0, common_1.Param)("id"))
    ], CompanyVehiclesController.prototype, "findOne");
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_company_guard_1.JwtCompanyAuthGuard),
        (0, common_1.Patch)('/:fleetid/:id'),
        (0, swagger_1.ApiBearerAuth)(),
        openapi.ApiResponse({ status: 200, type: String }),
        __param(0, (0, common_1.Request)()),
        __param(1, (0, common_1.Param)("fleetid")),
        __param(2, (0, common_1.Param)('id')),
        __param(3, (0, common_1.Body)())
    ], CompanyVehiclesController.prototype, "update");
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_company_guard_1.JwtCompanyAuthGuard),
        (0, common_1.Delete)('/:fleetid/:id'),
        (0, swagger_1.ApiBearerAuth)(),
        openapi.ApiResponse({ status: 200, type: String }),
        __param(0, (0, common_1.Request)()),
        __param(1, (0, common_1.Param)("fleetid")),
        __param(2, (0, common_1.Param)("id"))
    ], CompanyVehiclesController.prototype, "remove");
    CompanyVehiclesController = __decorate([
        (0, swagger_1.ApiTags)('CompanyVehicles'),
        (0, common_1.Controller)('company-vehicles')
    ], CompanyVehiclesController);
    return CompanyVehiclesController;
}());
exports.CompanyVehiclesController = CompanyVehiclesController;
