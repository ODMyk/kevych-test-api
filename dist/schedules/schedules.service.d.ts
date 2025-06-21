import { PrismaService } from 'src/prisma/prisma.service';
import { TrainScheduleGateway } from 'src/train-schedule/train-schedule.gateway';
import { CreateScheduleDto, FilterScheduleDto, PaginatedSchedulesResponseDto, UpdateScheduleDto } from './dtos/shedule.dto';
export declare class SchedulesService {
    private readonly prisma;
    private readonly trainScheduleGateway;
    constructor(prisma: PrismaService, trainScheduleGateway: TrainScheduleGateway);
    getMany(searchDto: FilterScheduleDto, userId: string): Promise<PaginatedSchedulesResponseDto>;
    getOne(id: string, userId: string): Promise<any>;
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
