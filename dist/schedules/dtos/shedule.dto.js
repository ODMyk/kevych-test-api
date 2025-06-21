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
exports.PaginatedSchedulesResponseDto = exports.ScheduleResponseDto = exports.FilterScheduleDto = exports.UpdateScheduleDto = exports.CreateScheduleDto = exports.BaseScheduleFieldsDto = exports.AdditionalStopDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const pagination_dto_1 = require("../../common/dtos/pagination.dto");
const city_enum_1 = require("../../common/enums/city.enum");
const train_type_enum_1 = require("../enums/train-type.enum");
class AdditionalStopDto {
    stationName;
    arrivalTime;
}
exports.AdditionalStopDto = AdditionalStopDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the station for the intermediate stop',
        enum: city_enum_1.City,
        example: city_enum_1.City.POLTAVA,
        enumName: 'City',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(city_enum_1.City),
    __metadata("design:type", String)
], AdditionalStopDto.prototype, "stationName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ISO 8601 string representing the arrival time at this specific intermediate stop',
        example: '2025-06-20T10:30:00Z',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], AdditionalStopDto.prototype, "arrivalTime", void 0);
class BaseScheduleFieldsDto {
    trainNumber;
    routeName;
    origin;
    destination;
    departureTime;
    arrivalTime;
    additionalStops;
    trainType;
}
exports.BaseScheduleFieldsDto = BaseScheduleFieldsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier for the train',
        example: 'TRN-001',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BaseScheduleFieldsDto.prototype, "trainNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the route',
        example: 'Kyiv - Lviv',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BaseScheduleFieldsDto.prototype, "routeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Departure station of the train',
        enum: city_enum_1.City,
        example: city_enum_1.City.KYIV,
        enumName: 'City',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(city_enum_1.City),
    __metadata("design:type", String)
], BaseScheduleFieldsDto.prototype, "origin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Final arrival station of the train',
        enum: city_enum_1.City,
        example: city_enum_1.City.LVIV,
        enumName: 'City',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(city_enum_1.City),
    __metadata("design:type", String)
], BaseScheduleFieldsDto.prototype, "destination", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ISO 8601 string representing the scheduled departure time from the origin',
        example: '2025-06-20T10:00:00Z',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], BaseScheduleFieldsDto.prototype, "departureTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ISO 8601 string representing the scheduled final arrival time at the destination',
        example: '2025-06-20T18:00:00Z',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], BaseScheduleFieldsDto.prototype, "arrivalTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'List of intermediate stops with their station names and arrival times',
        type: [AdditionalStopDto],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AdditionalStopDto),
    __metadata("design:type", Array)
], BaseScheduleFieldsDto.prototype, "additionalStops", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of train',
        enum: train_type_enum_1.TrainType,
        example: train_type_enum_1.TrainType.PASSENGER,
        enumName: 'TrainType',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(train_type_enum_1.TrainType),
    __metadata("design:type", String)
], BaseScheduleFieldsDto.prototype, "trainType", void 0);
class CreateScheduleDto extends BaseScheduleFieldsDto {
}
exports.CreateScheduleDto = CreateScheduleDto;
class UpdateScheduleDto extends (0, swagger_1.PartialType)(BaseScheduleFieldsDto) {
}
exports.UpdateScheduleDto = UpdateScheduleDto;
class FilterScheduleDto extends pagination_dto_1.PaginationDto {
    date;
    trainType;
    origin;
    destination;
}
exports.FilterScheduleDto = FilterScheduleDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter schedules by a specific departure date (YYYY-MM-DD)',
        example: '2025-06-20',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], FilterScheduleDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter schedules by train type',
        enum: train_type_enum_1.TrainType,
        example: train_type_enum_1.TrainType.PASSENGER,
        enumName: 'TrainType',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(train_type_enum_1.TrainType),
    __metadata("design:type", String)
], FilterScheduleDto.prototype, "trainType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter schedules by origin station name',
        enum: city_enum_1.City,
        example: city_enum_1.City.KYIV,
        enumName: 'City',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(city_enum_1.City),
    __metadata("design:type", String)
], FilterScheduleDto.prototype, "origin", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter schedules by destination station name',
        enum: city_enum_1.City,
        example: city_enum_1.City.LVIV,
        enumName: 'City',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(city_enum_1.City),
    __metadata("design:type", String)
], FilterScheduleDto.prototype, "destination", void 0);
class ScheduleResponseDto extends BaseScheduleFieldsDto {
    id;
    createdAt;
    updatedAt;
    isFavorite;
}
exports.ScheduleResponseDto = ScheduleResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier of the schedule',
        example: 'a1b2c3d4e5f6',
    }),
    __metadata("design:type", String)
], ScheduleResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ISO 8601 string representing the creation timestamp of the schedule',
        example: '2025-06-19T14:30:00Z',
    }),
    __metadata("design:type", String)
], ScheduleResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ISO 8601 string representing the last update timestamp of the schedule',
        example: '2025-06-19T15:00:00Z',
    }),
    __metadata("design:type", String)
], ScheduleResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the schedule is marked as a favorite by the user',
        example: true,
    }),
    __metadata("design:type", Boolean)
], ScheduleResponseDto.prototype, "isFavorite", void 0);
class PaginatedSchedulesResponseDto {
    data;
    currentPage;
    totalPages;
    totalItems;
    limit;
}
exports.PaginatedSchedulesResponseDto = PaginatedSchedulesResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [ScheduleResponseDto],
        description: 'Array of train schedule data for the current page',
    }),
    __metadata("design:type", Array)
], PaginatedSchedulesResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Current page number', example: 1 }),
    __metadata("design:type", Number)
], PaginatedSchedulesResponseDto.prototype, "currentPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total number of pages available', example: 5 }),
    __metadata("design:type", Number)
], PaginatedSchedulesResponseDto.prototype, "totalPages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total number of items across all pages',
        example: 98,
    }),
    __metadata("design:type", Number)
], PaginatedSchedulesResponseDto.prototype, "totalItems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of items per page', example: 20 }),
    __metadata("design:type", Number)
], PaginatedSchedulesResponseDto.prototype, "limit", void 0);
//# sourceMappingURL=shedule.dto.js.map