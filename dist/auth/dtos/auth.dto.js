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
exports.JwtPayloadDto = exports.AuthResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const user_role_enum_1 = require("../enums/user-role.enum");
const user_dto_1 = require("./user.dto");
class AuthResponseDto {
    accessToken;
    user;
}
exports.AuthResponseDto = AuthResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'JWT Access Token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    }),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: user_dto_1.UserResponseDto,
        description: "Authenticated user's public information",
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => user_dto_1.UserResponseDto),
    __metadata("design:type", user_dto_1.UserResponseDto)
], AuthResponseDto.prototype, "user", void 0);
class JwtPayloadDto {
    sub;
    email;
    roles;
    exp;
    iat;
}
exports.JwtPayloadDto = JwtPayloadDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Subject of the token (User ID)',
        example: 'user-id-123',
    }),
    __metadata("design:type", String)
], JwtPayloadDto.prototype, "sub", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User's email address",
        example: 'user@example.com',
    }),
    __metadata("design:type", String)
], JwtPayloadDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of roles of the user',
        enum: user_role_enum_1.UserRole,
        enumName: 'UserRole',
        isArray: true,
        example: [user_role_enum_1.UserRole.USER],
    }),
    __metadata("design:type", Array)
], JwtPayloadDto.prototype, "roles", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Timestamp when the token expires (Unix timestamp)',
        example: 1678886400,
    }),
    __metadata("design:type", Number)
], JwtPayloadDto.prototype, "exp", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Timestamp when the token was issued (Unix timestamp)',
        example: 1678799999,
    }),
    __metadata("design:type", Number)
], JwtPayloadDto.prototype, "iat", void 0);
//# sourceMappingURL=auth.dto.js.map