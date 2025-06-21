import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

/**
 * DTO for query parameters for pagination.
 * Used for GET /schedules
 */
export class PaginationDto {
  @ApiPropertyOptional({
    description: 'Page number for pagination (starts from 1)',
    minimum: 1,
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1; // Default to page 1

  @ApiPropertyOptional({
    description: 'Number of items per page (max 100)',
    minimum: 1,
    maximum: 100,
    example: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100) // Set a reasonable max limit to prevent abuse
  limit?: number = 20; // Default to 20 items per page
}
