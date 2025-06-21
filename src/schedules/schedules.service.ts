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
      additionalStops: s.additionalStops?.map((s) => JSON.parse(s as string)),
      isFavorite: false,
    })) as any;

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
      additionalStops: item.additionalStops?.map((s) => JSON.parse(s as string)),
      isFavorite,
    } as any;
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
      isFavorite: false,
    } as any;

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
    console.log(JSON.stringify(dto, null, 2))
    const updated = await this.prisma.schedule.update({
      where: {
        id,
      },
      data: {
        ...dto,
        additionalStops: dto.additionalStops?.map((s) => JSON.stringify(s)),
      },
    });

    console.log(JSON.stringify(updated, null, 2))


    const formatted = {
      ...(updated as unknown as BaseScheduleFieldsDto & { id: string }),
      additionalStops: updated.additionalStops?.map((s) => JSON.parse(s as string)),
    };

    this.trainScheduleGateway.emitScheduleChange({
      changeType: 'updated',
      schedule: formatted as ScheduleResponseDto,
    });

    return formatted;
  }
}
