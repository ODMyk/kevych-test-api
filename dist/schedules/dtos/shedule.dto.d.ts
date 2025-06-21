import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { City } from 'src/common/enums/city.enum';
import { TrainType } from '../enums/train-type.enum';
export declare class AdditionalStopDto {
    stationName: City;
    arrivalTime: string;
}
export declare class BaseScheduleFieldsDto {
    trainNumber: string;
    routeName: string;
    origin: City;
    destination: City;
    departureTime: string;
    arrivalTime: string;
    additionalStops?: AdditionalStopDto[];
    trainType: TrainType;
}
export declare class CreateScheduleDto extends BaseScheduleFieldsDto {
}
declare const UpdateScheduleDto_base: import("@nestjs/common").Type<Partial<BaseScheduleFieldsDto>>;
export declare class UpdateScheduleDto extends UpdateScheduleDto_base {
}
export declare class FilterScheduleDto extends PaginationDto {
    date?: string;
    trainType?: TrainType;
    origin?: City;
    destination?: City;
}
export declare class ScheduleResponseDto extends BaseScheduleFieldsDto {
    id: string;
    createdAt: string;
    updatedAt: string;
    isFavorite: boolean;
}
export declare class PaginatedSchedulesResponseDto {
    data: ScheduleResponseDto[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
}
export {};
