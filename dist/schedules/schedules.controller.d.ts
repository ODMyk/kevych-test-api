import { CreateScheduleDto, FilterScheduleDto, PaginatedSchedulesResponseDto, ScheduleResponseDto, UpdateScheduleDto } from './dtos/shedule.dto';
import { SchedulesService } from './schedules.service';
import { RequestWithUser } from 'src/common/types/RequestWithUser';
export declare class SchedulesController {
    private readonly schedulesService;
    constructor(schedulesService: SchedulesService);
    getMany(searchDto: FilterScheduleDto, req: RequestWithUser): Promise<PaginatedSchedulesResponseDto>;
    getOne(id: string, req: RequestWithUser): Promise<ScheduleResponseDto>;
    create(scheduleDto: CreateScheduleDto): Promise<{
        id: string;
        trainNumber: string;
        routeName: string;
        origin: import(".prisma/client").$Enums.City;
        destination: import(".prisma/client").$Enums.City;
        departureTime: Date;
        arrivalTime: Date;
        additionalStops: import("@prisma/client/runtime/library").JsonValue[];
        trainType: import(".prisma/client").$Enums.TrainType;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: string): Promise<void>;
    update(id: string, dto: UpdateScheduleDto): Promise<{
        additionalStops: any[];
        trainNumber: string;
        routeName: string;
        origin: import("../common/enums/city.enum").City;
        destination: import("../common/enums/city.enum").City;
        departureTime: string;
        arrivalTime: string;
        trainType: import("./enums/train-type.enum").TrainType;
        id: string;
    }>;
}
