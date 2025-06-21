import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginatedFavoritesResponseDto } from './dtos/favorites.dto';
export declare class FavoritesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, favoriteId: string): Promise<{
        id: string;
        createdAt: Date;
        scheduleId: string;
        userId: string;
    }>;
    delete(userId: string, favoriteId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    findAll(userId: string, pagination: PaginationDto): Promise<PaginatedFavoritesResponseDto>;
}
