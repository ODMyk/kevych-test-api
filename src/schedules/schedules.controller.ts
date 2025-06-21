import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserRole } from 'src/auth/enums/user-role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import {
  CreateScheduleDto,
  FilterScheduleDto,
  PaginatedSchedulesResponseDto,
  ScheduleResponseDto,
  UpdateScheduleDto,
} from './dtos/shedule.dto';
import { SchedulesService } from './schedules.service';

import { RequestWithUser } from 'src/common/types/RequestWithUser';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('Schedules')
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a portion of schedules' })
  @ApiOkResponse({
    description: 'Success',
    type: PaginatedSchedulesResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @ApiUnauthorizedResponse({ description: 'Invalid or expired token' })
  @ApiForbiddenResponse({ description: 'User does not have required role' })
  @Get()
  async getMany(
    @Query(new ValidationPipe({ transform: true }))
    searchDto: FilterScheduleDto,
    @Req() req: RequestWithUser,
  ): Promise<PaginatedSchedulesResponseDto> {
    return this.schedulesService.getMany(searchDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a schedule by id' })
  @ApiOkResponse({ description: 'Success', type: ScheduleResponseDto })
  @ApiParam({ name: 'id', description: 'The ID of the schedule' })
  @ApiNotFoundResponse({ description: 'Schedule not found' })
  @ApiUnauthorizedResponse({ description: 'Invalid or expired token' })
  @ApiForbiddenResponse({ description: 'User does not have required role' })
  @Get('/:id')
  async getOne(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
  ): Promise<ScheduleResponseDto> {
    return this.schedulesService.getOne(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a schedule' })
  @ApiCreatedResponse({ description: 'Created' })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @ApiUnauthorizedResponse({ description: 'Invalid or expired token' })
  @ApiForbiddenResponse({ description: 'User does not have required role' })
  @Post()
  async create(@Body() scheduleDto: CreateScheduleDto) {
    return this.schedulesService.create(scheduleDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a schedule by id' })
  @ApiOkResponse({ description: 'Success' })
  @ApiParam({ name: 'id', description: 'The ID of the schedule' })
  @ApiNotFoundResponse({ description: 'Schedule not found' })
  @ApiUnauthorizedResponse({ description: 'Invalid or expired token' })
  @ApiForbiddenResponse({ description: 'User does not have required role' })
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.schedulesService.delete(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a schedule by id' })
  @ApiOkResponse({ description: 'Success' })
  @ApiParam({ name: 'id', description: 'The ID of the schedule' })
  @ApiNotFoundResponse({ description: 'Schedule not found' })
  @ApiUnauthorizedResponse({ description: 'Invalid or expired token' })
  @ApiForbiddenResponse({ description: 'User does not have required role' })
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateScheduleDto) {
    return this.schedulesService.update(id, dto);
  }
}
