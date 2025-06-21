import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ScheduleResponseDto } from 'src/schedules/dtos/shedule.dto';

export class ScheduleChangeEventPayload {
  @ApiProperty({
    description: 'Type of change that occurred to the schedule',
    enum: ['created', 'updated', 'deleted'],
    example: 'updated',
  })
  @IsNotEmpty()
  @IsEnum(['created', 'updated', 'deleted'])
  changeType: 'created' | 'updated' | 'deleted';

  @ApiPropertyOptional({
    description: 'Full schedule data for "created" or "updated" events',
    type: ScheduleResponseDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ScheduleResponseDto)
  schedule?: ScheduleResponseDto;

  @ApiPropertyOptional({
    description: 'Only the ID of the schedule for "deleted" events',
    example: 'schedule-id-to-delete',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  scheduleId?: string;
}
