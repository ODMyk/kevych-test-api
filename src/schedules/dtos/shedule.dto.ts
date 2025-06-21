import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger'; // Import Swagger decorators
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { City } from 'src/common/enums/city.enum';
import { TrainType } from '../enums/train-type.enum';

/**
 * DTO for an individual additional stop.
 * Used within other schedule DTOs.
 */
export class AdditionalStopDto {
  @ApiProperty({
    description: 'Name of the station for the intermediate stop',
    enum: City,
    example: City.POLTAVA,
    enumName: 'City',
  })
  @IsNotEmpty()
  @IsEnum(City)
  stationName: City; // Changed to City enum

  @ApiProperty({
    description:
      'ISO 8601 string representing the arrival time at this specific intermediate stop',
    example: '2025-06-20T10:30:00Z',
  })
  @IsNotEmpty()
  @IsDateString()
  arrivalTime: string;
}

/**
 * Base DTO containing common fields for train schedules.
 * This promotes the DRY principle.
 */
export class BaseScheduleFieldsDto {
  @ApiProperty({
    description: 'Unique identifier for the train',
    example: 'TRN-001',
  })
  @IsNotEmpty()
  @IsString()
  trainNumber: string;

  @ApiProperty({
    description: 'Name of the route',
    example: 'Kyiv - Lviv',
  })
  @IsNotEmpty()
  @IsString()
  routeName: string;

  @ApiProperty({
    description: 'Departure station of the train',
    enum: City,
    example: City.KYIV,
    enumName: 'City',
  })
  @IsNotEmpty()
  @IsEnum(City) // Changed to City enum
  origin: City;

  @ApiProperty({
    description: 'Final arrival station of the train',
    enum: City,
    example: City.LVIV,
    enumName: 'City',
  })
  @IsNotEmpty()
  @IsEnum(City) // Changed to City enum
  destination: City;

  @ApiProperty({
    description:
      'ISO 8601 string representing the scheduled departure time from the origin',
    example: '2025-06-20T10:00:00Z',
  })
  @IsNotEmpty()
  @IsDateString()
  departureTime: string;

  @ApiProperty({
    description:
      'ISO 8601 string representing the scheduled final arrival time at the destination',
    example: '2025-06-20T18:00:00Z',
  })
  @IsNotEmpty()
  @IsDateString()
  arrivalTime: string;

  @ApiPropertyOptional({
    description:
      'List of intermediate stops with their station names and arrival times',
    type: [AdditionalStopDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AdditionalStopDto)
  additionalStops?: AdditionalStopDto[];

  @ApiProperty({
    description: 'Type of train',
    enum: TrainType,
    example: TrainType.PASSENGER,
    enumName: 'TrainType',
  })
  @IsNotEmpty()
  @IsEnum(TrainType)
  trainType: TrainType;
}

/**
 * DTO for creating a new train schedule.
 * Used by Admin role via POST /schedules
 * All fields inherited from BaseScheduleFieldsDto are required by default.
 */
export class CreateScheduleDto extends BaseScheduleFieldsDto {
  // No additional fields needed here if all are in BaseScheduleFieldsDto and are required.
  // If specific fields needed to be explicitly marked as @IsNotEmpty() even if inherited,
  // you would re-declare them here with the decorator.
}

/**
 * DTO for updating an existing train schedule.
 * Used by Admin role via PUT /schedules/:id
 * All fields are optional as only specific fields might be updated.
 * PartialType makes all properties of BaseScheduleFieldsDto optional.
 */
export class UpdateScheduleDto extends PartialType(BaseScheduleFieldsDto) {
  // No additional fields needed here, PartialType handles optionality.
}

/**
 * DTO for query parameters for filtering train schedules.
 * Extends PaginationDto to include pagination along with filters.
 * Used for GET /schedules
 */
export class FilterScheduleDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Filter schedules by a specific departure date (YYYY-MM-DD)',
    example: '2025-06-20',
  })
  @IsOptional()
  @IsDateString()
  date?: string; // Filter by a specific date (e.g., 'YYYY-MM-DD')

  @ApiPropertyOptional({
    description: 'Filter schedules by train type',
    enum: TrainType,
    example: TrainType.PASSENGER,
    enumName: 'TrainType',
  })
  @IsOptional()
  @IsEnum(TrainType)
  trainType?: TrainType; // Filter by train type

  @ApiPropertyOptional({
    description: 'Filter schedules by origin station name',
    enum: City,
    example: City.KYIV,
    enumName: 'City',
  })
  @IsOptional()
  @IsEnum(City) // Changed to City enum
  origin?: City; // Filter by origin station

  @ApiPropertyOptional({
    description: 'Filter schedules by destination station name',
    enum: City,
    example: City.LVIV,
    enumName: 'City',
  })
  @IsOptional()
  @IsEnum(City) // Changed to City enum
  destination?: City; // Filter by destination station
}

/**
 * DTO for the response of a single schedule.
 * This would be the structure of data sent from server to client.
 */
export class ScheduleResponseDto extends BaseScheduleFieldsDto {
  @ApiProperty({
    description: 'Unique identifier of the schedule',
    example: 'a1b2c3d4e5f6',
  })
  id: string; // Unique ID of the schedule

  @ApiProperty({
    description:
      'ISO 8601 string representing the creation timestamp of the schedule',
    example: '2025-06-19T14:30:00Z',
  })
  createdAt: string; // ISO 8601 string

  @ApiProperty({
    description:
      'ISO 8601 string representing the last update timestamp of the schedule',
    example: '2025-06-19T15:00:00Z',
  })
  updatedAt: string; // ISO 8601 string

  @ApiProperty({
    description: 'Whether the schedule is marked as a favorite by the user',
    example: true,
  })
  isFavorite: boolean;
}

/**
 * DTO for the paginated response of train schedules.
 * This is what your GET /schedules endpoint would return.
 */
export class PaginatedSchedulesResponseDto {
  @ApiProperty({
    type: [ScheduleResponseDto],
    description: 'Array of train schedule data for the current page',
  })
  data: ScheduleResponseDto[];

  @ApiProperty({ description: 'Current page number', example: 1 })
  currentPage: number;

  @ApiProperty({ description: 'Total number of pages available', example: 5 })
  totalPages: number;

  @ApiProperty({
    description: 'Total number of items across all pages',
    example: 98,
  })
  totalItems: number;

  @ApiProperty({ description: 'Number of items per page', example: 20 })
  limit: number;
}
