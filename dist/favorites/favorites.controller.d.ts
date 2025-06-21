import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { RequestWithUser } from 'src/common/types/RequestWithUser';
import { CreateFavoriteDto, PaginatedFavoritesResponseDto } from './dtos/favorites.dto';
import { FavoritesService } from './favorites.service';
export declare class FavoritesController {
    private readonly favoritesService;
    constructor(favoritesService: FavoritesService);
    findAll(req: RequestWithUser, pagination: PaginationDto): Promise<PaginatedFavoritesResponseDto>;
    create(req: RequestWithUser, { scheduleId }: CreateFavoriteDto): Promise<{
        id: string;
        createdAt: Date;
        scheduleId: string;
        userId: string;
    }>;
    delete(req: RequestWithUser, favoriteId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
