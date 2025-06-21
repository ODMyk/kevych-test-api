import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserRole } from 'src/auth/enums/user-role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { RequestWithUser } from 'src/common/types/RequestWithUser';
import {
  CreateFavoriteDto,
  PaginatedFavoritesResponseDto,
} from './dtos/favorites.dto';
import { FavoritesService } from './favorites.service';

@ApiTags('Favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a portion of favorite schedules' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: PaginatedFavoritesResponseDto,
  })
  @Get()
  findAll(
    @Request() req: RequestWithUser,
    @Query(new ValidationPipe({ transform: true }))
    pagination: PaginationDto,
  ): Promise<PaginatedFavoritesResponseDto> {
    return this.favoritesService.findAll(req.user.id, pagination);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a schedule to favorites' })
  @ApiResponse({ status: 201, description: 'Successful add' })
  @Post()
  create(
    @Request() req: RequestWithUser,
    @Body(new ValidationPipe({ transform: true }))
    { scheduleId }: CreateFavoriteDto,
  ) {
    return this.favoritesService.create(req.user.id, scheduleId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a favorite schedule' })
  @ApiResponse({ status: 204, description: 'Successful deletion' })
  @Delete('/:id')
  delete(@Request() req: RequestWithUser, @Param('id') favoriteId: string) {
    return this.favoritesService.delete(req.user.id, favoriteId);
  }
}
