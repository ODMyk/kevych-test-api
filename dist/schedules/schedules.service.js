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
exports.SchedulesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const train_schedule_gateway_1 = require("../train-schedule/train-schedule.gateway");
let SchedulesService = class SchedulesService {
    prisma;
    trainScheduleGateway;
    constructor(prisma, trainScheduleGateway) {
        this.prisma = prisma;
        this.trainScheduleGateway = trainScheduleGateway;
    }
    async getMany(searchDto, userId) {
        const page = await this.prisma.schedule.findMany({
            where: {
                departureTime: {
                    gte: searchDto.date,
                },
                trainType: searchDto.trainType,
            },
            take: searchDto.limit ?? 20,
            skip: ((searchDto.page ?? 1) - 1) * (searchDto.limit ?? 20),
        });
        const count = await this.prisma.schedule.count({
            where: {
                departureTime: {
                    gte: searchDto.date,
                },
                trainType: searchDto.trainType,
            },
        });
        const data = page.map((s) => ({
            ...s,
            additionalStops: s.additionalStops?.map((s) => JSON.parse(s)),
            isFavorite: false,
        }));
        for (let i = 0; i < data.length; i++) {
            data[i].isFavorite = !!(await this.prisma.favorite.findFirst({
                where: {
                    userId,
                    scheduleId: data[i].id,
                },
            }));
        }
        return {
            data,
            currentPage: searchDto.page ?? 1,
            totalPages: Math.ceil(count / (searchDto.limit ?? 20)),
            totalItems: count,
            limit: searchDto.limit ?? 20,
        };
    }
    async getOne(id, userId) {
        const item = await this.prisma.schedule.findUnique({
            where: {
                id,
            },
        });
        if (!item) {
            throw new common_1.NotFoundException('Schedule not found');
        }
        const isFavorite = !!(await this.prisma.favorite.findFirst({
            where: {
                scheduleId: id,
                userId,
            },
        }));
        return {
            ...item,
            additionalStops: item.additionalStops?.map((s) => JSON.parse(s)),
            isFavorite,
        };
    }
    async create(scheduleDto) {
        const created = await this.prisma.schedule.create({
            data: {
                ...scheduleDto,
                additionalStops: scheduleDto.additionalStops?.map((s) => JSON.stringify(s)),
            },
        });
        const formattedSchedule = {
            ...created,
            isFavorite: false,
        };
        this.trainScheduleGateway.emitScheduleChange({
            changeType: 'created',
            schedule: formattedSchedule,
        });
        return created;
    }
    async delete(id) {
        await this.prisma.schedule.delete({
            where: {
                id,
            },
        });
        this.trainScheduleGateway.emitScheduleChange({
            changeType: 'deleted',
            scheduleId: id,
        });
    }
    async update(id, dto) {
        console.log(JSON.stringify(dto, null, 2));
        const updated = await this.prisma.schedule.update({
            where: {
                id,
            },
            data: {
                ...dto,
                additionalStops: dto.additionalStops?.map((s) => JSON.stringify(s)),
            },
        });
        console.log(JSON.stringify(updated, null, 2));
        const formatted = {
            ...updated,
            additionalStops: updated.additionalStops?.map((s) => JSON.parse(s)),
        };
        this.trainScheduleGateway.emitScheduleChange({
            changeType: 'updated',
            schedule: formatted,
        });
        return formatted;
    }
};
exports.SchedulesService = SchedulesService;
exports.SchedulesService = SchedulesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        train_schedule_gateway_1.TrainScheduleGateway])
], SchedulesService);
//# sourceMappingURL=schedules.service.js.map