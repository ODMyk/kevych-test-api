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
exports.PaginatedFavoritesResponseDto = exports.GetFavoritesDto = exports.FavoriteLinkResponseDto = exports.CreateFavoriteDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const pagination_dto_1 = require("../../common/dtos/pagination.dto");
const shedule_dto_1 = require("../../schedules/dtos/shedule.dto");
class CreateFavoriteDto {
    scheduleId;
}
exports.CreateFavoriteDto = CreateFavoriteDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the train schedule to favorite',
        example: 'schedule-id-abc',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFavoriteDto.prototype, "scheduleId", void 0);
class FavoriteLinkResponseDto {
    id;
    userId;
    scheduleId;
    createdAt;
}
exports.FavoriteLinkResponseDto = FavoriteLinkResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier of the favorite entry link',
        example: 'favorite-link-id-xyz',
    }),
    __metadata("design:type", String)
], FavoriteLinkResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the user who favorited the schedule',
        example: 'user-id-123',
    }),
    __metadata("design:type", String)
], FavoriteLinkResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the favorited train schedule',
        example: 'schedule-id-abc',
    }),
    __metadata("design:type", String)
], FavoriteLinkResponseDto.prototype, "scheduleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ISO 8601 string representing the creation timestamp of the favorite',
        example: '2025-06-19T17:00:00Z',
    }),
    __metadata("design:type", String)
], FavoriteLinkResponseDto.prototype, "createdAt", void 0);
class GetFavoritesDto extends pagination_dto_1.PaginationDto {
}
exports.GetFavoritesDto = GetFavoritesDto;
class PaginatedFavoritesResponseDto {
    data;
    currentPage;
    totalPages;
    totalItems;
    limit;
}
exports.PaginatedFavoritesResponseDto = PaginatedFavoritesResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [shedule_dto_1.ScheduleResponseDto],
        description: 'Array of full train schedule details that the authenticated user has favorited for the current page.',
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => shedule_dto_1.ScheduleResponseDto),
    __metadata("design:type", Array)
], PaginatedFavoritesResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Current page number', example: 1 }),
    __metadata("design:type", Number)
], PaginatedFavoritesResponseDto.prototype, "currentPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total number of pages available', example: 2 }),
    __metadata("design:type", Number)
], PaginatedFavoritesResponseDto.prototype, "totalPages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total number of favorite entries across all pages',
        example: 35,
    }),
    __metadata("design:type", Number)
], PaginatedFavoritesResponseDto.prototype, "totalItems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of items per page', example: 20 }),
    __metadata("design:type", Number)
], PaginatedFavoritesResponseDto.prototype, "limit", void 0);
//# sourceMappingURL=favorites.dto.js.map