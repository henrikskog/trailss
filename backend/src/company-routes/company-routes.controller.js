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
exports.__esModule = true;
exports.CompanyRoutesController = void 0;
var openapi = require("@nestjs/swagger");
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var CompanyRoutesController = /** @class */ (function () {
    function CompanyRoutesController(companyRoutesService) {
        this.companyRoutesService = companyRoutesService;
    }
    CompanyRoutesController.prototype.create = function (createCompanyRouteDto) {
        return this.companyRoutesService.create(createCompanyRouteDto);
    };
    CompanyRoutesController.prototype.findAll = function () {
        return this.companyRoutesService.findAll();
    };
    CompanyRoutesController.prototype.findOne = function (id) {
        return this.companyRoutesService.findOne(+id);
    };
    CompanyRoutesController.prototype.update = function (id, updateCompanyRouteDto) {
        return this.companyRoutesService.update(+id, updateCompanyRouteDto);
    };
    CompanyRoutesController.prototype.remove = function (id) {
        return this.companyRoutesService.remove(+id);
    };
    __decorate([
        (0, common_1.Post)(),
        openapi.ApiResponse({ status: 201, type: String }),
        __param(0, (0, common_1.Body)())
    ], CompanyRoutesController.prototype, "create");
    __decorate([
        (0, common_1.Get)(),
        openapi.ApiResponse({ status: 200, type: String })
    ], CompanyRoutesController.prototype, "findAll");
    __decorate([
        (0, common_1.Get)(':id'),
        openapi.ApiResponse({ status: 200, type: String }),
        __param(0, (0, common_1.Param)('id'))
    ], CompanyRoutesController.prototype, "findOne");
    __decorate([
        (0, common_1.Patch)(':id'),
        openapi.ApiResponse({ status: 200, type: String }),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)())
    ], CompanyRoutesController.prototype, "update");
    __decorate([
        (0, common_1.Delete)(':id'),
        openapi.ApiResponse({ status: 200, type: String }),
        __param(0, (0, common_1.Param)('id'))
    ], CompanyRoutesController.prototype, "remove");
    CompanyRoutesController = __decorate([
        (0, swagger_1.ApiTags)('CompanyRoutes'),
        (0, common_1.Controller)('company-routes')
    ], CompanyRoutesController);
    return CompanyRoutesController;
}());
exports.CompanyRoutesController = CompanyRoutesController;
