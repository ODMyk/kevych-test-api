import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ScheduleResponseDto } from 'src/schedules/dtos/shedule.dto';

/**
 * DTO for creating a new favorite entry.
 * Used when a user adds a schedule to their favorites (POST /favorites).
 */
export class CreateFavoriteDto {
  @ApiProperty({
    description: 'The ID of the train schedule to favorite',
    example: 'schedule-id-abc',
  })
  @IsNotEmpty()
  @IsString()
  scheduleId: string;
}

/**
 * DTO representing a favorite entry in responses.
 * This DTO specifically represents the link between a user and a favorited schedule ID.
 * It's useful for database entities or internal service representation.
 */
export class FavoriteLinkResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the favorite entry link',
    example: 'favorite-link-id-xyz',
  })
  id: string;

  @ApiProperty({
    description: 'The ID of the user who favorited the schedule',
    example: 'user-id-123',
  })
  userId: string;

  @ApiProperty({
    description: 'The ID of the favorited train schedule',
    example: 'schedule-id-abc',
  })
  scheduleId: string;

  @ApiProperty({
    description:
      'ISO 8601 string representing the creation timestamp of the favorite',
    example: '2025-06-19T17:00:00Z',
  })
  createdAt: string;
}

/**
 * DTO for retrieving favorite schedules, including pagination parameters.
 * This replaces FilterFavoritesDto, ensuring only pagination is used.
 * Used for GET /favorites
 */
export class GetFavoritesDto extends PaginationDto {
  // No additional filter fields here, only pagination from PaginationDto.
}

/**
 * DTO for the response containing a user's paginated favorited schedules.
 * This will return the full schedule details for items the user has favorited, paginated.
 */
export class PaginatedFavoritesResponseDto {
  @ApiProperty({
    type: [ScheduleResponseDto],
    description:
      'Array of full train schedule details that the authenticated user has favorited for the current page.',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScheduleResponseDto)
  data: ScheduleResponseDto[];

  @ApiProperty({ description: 'Current page number', example: 1 })
  currentPage: number;

  @ApiProperty({ description: 'Total number of pages available', example: 2 })
  totalPages: number;

  @ApiProperty({
    description: 'Total number of favorite entries across all pages',
    example: 35,
  })
  totalItems: number;

  @ApiProperty({ description: 'Number of items per page', example: 20 })
  limit: number;
}
