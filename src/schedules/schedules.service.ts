import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TrainScheduleGateway } from 'src/train-schedule/train-schedule.gateway';
import {
  AdditionalStopDto,
  BaseScheduleFieldsDto,
  CreateScheduleDto,
  FilterScheduleDto,
  PaginatedSchedulesResponseDto,
  ScheduleResponseDto,
  UpdateScheduleDto,
} from './dtos/shedule.dto';

@Injectable()
export class SchedulesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly trainScheduleGateway: TrainScheduleGateway,
  ) {}

  async getMany(
    searchDto: FilterScheduleDto,
    userId: string,
  ): Promise<PaginatedSchedulesResponseDto> {
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
      ...(s as unknown as BaseScheduleFieldsDto & { id: string }),
      arrivalTime: new Date(s.arrivalTime).toISOString(),
      departureTime: new Date(s.departureTime).toISOString(),
      createdAt: new Date(s.createdAt).toISOString(),
      updatedAt: new Date(s.updatedAt).toISOString(),
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

  async getOne(id: string, userId: string) {
    const item = await this.prisma.schedule.findUnique({
      where: {
        id,
      },
    });

    if (!item) {
      throw new NotFoundException('Schedule not found');
    }

    const isFavorite = !!(await this.prisma.favorite.findFirst({
      where: {
        scheduleId: id,
        userId,
      },
    }));

    return {
      ...(item as unknown as BaseScheduleFieldsDto & { id: string }),
      arrivalTime: new Date(item.arrivalTime).toISOString(),
      departureTime: new Date(item.departureTime).toISOString(),
      createdAt: new Date(item.createdAt).toISOString(),
      updatedAt: new Date(item.updatedAt).toISOString(),
      isFavorite,
    };
  }

  async create(scheduleDto: CreateScheduleDto) {
    const created = await this.prisma.schedule.create({
      data: {
        ...scheduleDto,
        additionalStops: scheduleDto.additionalStops?.map((s) =>
          JSON.stringify(s),
        ),
      },
    });

    const formattedSchedule: ScheduleResponseDto = {
      ...(created as unknown as BaseScheduleFieldsDto & { id: string }),
      departureTime: created.departureTime.toISOString(),
      arrivalTime: created.arrivalTime.toISOString(),
      createdAt: created.createdAt.toISOString(),
      updatedAt: created.updatedAt.toISOString(),
      additionalStops: created.additionalStops
        ? created.additionalStops
            .filter((s) => s !== null)
            .map((stop) => {
              const stop_ = stop as unknown as AdditionalStopDto;
              return {
                stationName: stop_.stationName,
                arrivalTime: new Date(stop_.arrivalTime).toISOString(),
              };
            })
        : [],
      isFavorite: false,
    };

    this.trainScheduleGateway.emitScheduleChange({
      changeType: 'created',
      schedule: formattedSchedule,
    });

    return created;
  }

  async delete(id: string) {
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

  async update(id: string, dto: UpdateScheduleDto) {
    const updated = await this.prisma.schedule.update({
      where: {
        id,
      },
      data: {
        ...dto,
        additionalStops: dto.additionalStops?.map((s) => JSON.stringify(s)),
      },
    });

    const formatted = {
      ...(updated as unknown as BaseScheduleFieldsDto & { id: string }),
      departureTime: updated.departureTime.toISOString(),
      arrivalTime: updated.arrivalTime.toISOString(),
      createdAt: updated.createdAt.toISOString(),
      updatedAt: updated.updatedAt.toISOString(),
      additionalStops: updated.additionalStops
        ? updated.additionalStops
            .filter((s) => s !== null)
            .map((stop) => {
              const stop_ = stop as unknown as AdditionalStopDto;
              return {
                stationName: stop_.stationName,
                arrivalTime: new Date(stop_.arrivalTime).toISOString(),
              };
            })
        : [],
    };

    this.trainScheduleGateway.emitScheduleChange({
      changeType: 'updated',
      schedule: formatted as ScheduleResponseDto,
    });

    return formatted;
  }
}
