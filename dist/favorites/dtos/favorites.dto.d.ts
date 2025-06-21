import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ScheduleResponseDto } from 'src/schedules/dtos/shedule.dto';
export declare class CreateFavoriteDto {
    scheduleId: string;
}
export declare class FavoriteLinkResponseDto {
    id: string;
    userId: string;
    scheduleId: string;
    createdAt: string;
}
export declare class GetFavoritesDto extends PaginationDto {
}
export declare class PaginatedFavoritesResponseDto {
    data: ScheduleResponseDto[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
}
