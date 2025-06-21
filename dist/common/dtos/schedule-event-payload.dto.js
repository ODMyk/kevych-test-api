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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleChangeEventPayload = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const shedule_dto_1 = require("../../schedules/dtos/shedule.dto");
class ScheduleChangeEventPayload {
    changeType;
    schedule;
    scheduleId;
}
exports.ScheduleChangeEventPayload = ScheduleChangeEventPayload;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of change that occurred to the schedule',
        enum: ['created', 'updated', 'deleted'],
        example: 'updated',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(['created', 'updated', 'deleted']),
    __metadata("design:type", String)
], ScheduleChangeEventPayload.prototype, "changeType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Full schedule data for "created" or "updated" events',
        type: shedule_dto_1.ScheduleResponseDto,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => shedule_dto_1.ScheduleResponseDto),
    __metadata("design:type", shedule_dto_1.ScheduleResponseDto)
], ScheduleChangeEventPayload.prototype, "schedule", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Only the ID of the schedule for "deleted" events',
        example: 'schedule-id-to-delete',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ScheduleChangeEventPayload.prototype, "scheduleId", void 0);
//# sourceMappingURL=schedule-event-payload.dto.js.map