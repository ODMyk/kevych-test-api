import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BaseScheduleFieldsDto } from 'src/schedules/dtos/shedule.dto';
import { PaginatedFavoritesResponseDto } from './dtos/favorites.dto';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, favoriteId: string) {
    return this.prisma.favorite.create({
      data: {
        user: { connect: { id: userId } },
        schedule: { connect: { id: favoriteId } },
      },
    });
  }

  async delete(userId: string, favoriteId: string) {
    return this.prisma.favorite.deleteMany({
      where: {
        userId,
        scheduleId: favoriteId,
      },
    });
  }

  async findAll(
    userId: string,
    pagination: PaginationDto,
  ): Promise<PaginatedFavoritesResponseDto> {
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
        ...(favorite.schedule as unknown as BaseScheduleFieldsDto & {
          id: string;
        }),
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
}
