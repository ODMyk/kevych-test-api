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
exports.FavoritesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FavoritesService = class FavoritesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, favoriteId) {
        return this.prisma.favorite.create({
            data: {
                user: { connect: { id: userId } },
                schedule: { connect: { id: favoriteId } },
            },
        });
    }
    async delete(userId, favoriteId) {
        return this.prisma.favorite.deleteMany({
            where: {
                userId,
                scheduleId: favoriteId,
            },
        });
    }
    async findAll(userId, pagination) {
        const favorites = await this.prisma.favorite.findMany({
            where: {
                userId,
            },
            skip: ((pagination.page ?? 1) - 1) * (pagination.limit ?? 20),
            take: pagination.limit,
            include: {
                schedule: true,
            },
        });
        const count = await this.prisma.favorite.count({
            where: {
                userId,
            },
        });
        return {
            data: favorites.map((favorite) => ({
                ...favorite.schedule,
                arrivalTime: new Date(favorite.schedule.arrivalTime).toISOString(),
                departureTime: new Date(favorite.schedule.departureTime).toISOString(),
                createdAt: new Date(favorite.schedule.createdAt).toISOString(),
                updatedAt: new Date(favorite.schedule.updatedAt).toISOString(),
                isFavorite: true,
            })),
            currentPage: pagination.page ?? 1,
            limit: pagination.limit ?? 20,
            totalItems: count,
            totalPages: Math.ceil(count / (pagination.limit ?? 20)),
        };
    }
};
exports.FavoritesService = FavoritesService;
exports.FavoritesService = FavoritesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FavoritesService);
//# sourceMappingURL=favorites.service.js.map