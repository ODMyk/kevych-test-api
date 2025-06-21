"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_role_enum_1 = require("../auth/enums/user-role.enum");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const shedule_dto_1 = require("./dtos/shedule.dto");
const schedules_service_1 = require("./schedules.service");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
let SchedulesController = class SchedulesController {
    schedulesService;
    constructor(schedulesService) {
        this.schedulesService = schedulesService;
    }
    async getMany(searchDto, req) {
        return this.schedulesService.getMany(searchDto, req.user.id);
    }
    async getOne(id, req) {
        return this.schedulesService.getOne(id, req.user.id);
    }
    async create(scheduleDto) {
        return this.schedulesService.create(scheduleDto);
    }
    async delete(id) {
        return this.schedulesService.delete(id);
    }
    async update(id, dto) {
        return this.schedulesService.update(id, dto);
    }
};
exports.SchedulesController = SchedulesController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.USER),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get a portion of schedules' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Success',
        type: shedule_dto_1.PaginatedSchedulesResponseDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Validation failed' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Invalid or expired token' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'User does not have required role' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shedule_dto_1.FilterScheduleDto, Object]),
    __metadata("design:returntype", Promise)
], SchedulesController.prototype, "getMany", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.USER),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get a schedule by id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Success', type: shedule_dto_1.ScheduleResponseDto }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'The ID of the schedule' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Schedule not found' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Invalid or expired token' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'User does not have required role' }),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SchedulesController.prototype, "getOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a schedule' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Created' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Validation failed' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Invalid or expired token' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'User does not have required role' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shedule_dto_1.CreateScheduleDto]),
    __metadata("design:returntype", Promise)
], SchedulesController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a schedule by id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Success' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'The ID of the schedule' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Schedule not found' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Invalid or expired token' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'User does not have required role' }),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SchedulesController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a schedule by id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Success' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'The ID of the schedule' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Schedule not found' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Invalid or expired token' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'User does not have required role' }),
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, shedule_dto_1.UpdateScheduleDto]),
    __metadata("design:returntype", Promise)
], SchedulesController.prototype, "update", null);
exports.SchedulesController = SchedulesController = __decorate([
    (0, swagger_1.ApiTags)('Schedules'),
    (0, common_1.Controller)('schedules'),
    __metadata("design:paramtypes", [schedules_service_1.SchedulesService])
], SchedulesController);
//# sourceMappingURL=schedules.controller.js.map