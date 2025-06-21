import { PrismaService } from 'src/prisma/prisma.service';
import { TrainScheduleGateway } from 'src/train-schedule/train-schedule.gateway';
import { AdditionalStopDto, CreateScheduleDto, FilterScheduleDto, PaginatedSchedulesResponseDto, UpdateScheduleDto } from './dtos/shedule.dto';
export declare class SchedulesService {
    private readonly prisma;
    private readonly trainScheduleGateway;
    constructor(prisma: PrismaService, trainScheduleGateway: TrainScheduleGateway);
    getMany(searchDto: FilterScheduleDto, userId: string): Promise<PaginatedSchedulesResponseDto>;
    getOne(id: string, userId: string): Promise<{
        arrivalTime: string;
        departureTime: string;
        createdAt: string;
        updatedAt: string;
        isFavorite: boolean;
        trainNumber: string;
        routeName: string;
        origin: import("../common/enums/city.enum").City;
        destination: import("../common/enums/city.enum").City;
        additionalStops?: AdditionalStopDto[];
        trainType: import("./enums/train-type.enum").TrainType;
        id: string;
    }>;
    create(scheduleDto: CreateScheduleDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        arrivalTime: Date;
        trainNumber: string;
        routeName: string;
        origin: import(".prisma/client").$Enums.City;
        destination: import(".prisma/client").$Enums.City;
        departureTime: Date;
        additionalStops: import("@prisma/client/runtime/library").JsonValue[];
        trainType: import(".prisma/client").$Enums.TrainType;
    }>;
    delete(id: string): Promise<void>;
    update(id: string, dto: UpdateScheduleDto): Promise<{
        departureTime: string;
        arrivalTime: string;
        createdAt: string;
        updatedAt: string;
        additionalStops: {
            stationName: import("../common/enums/city.enum").City;
            arrivalTime: string;
        }[];
        trainNumber: string;
        routeName: string;
        origin: import("../common/enums/city.enum").City;
        destination: import("../common/enums/city.enum").City;
        trainType: import("./enums/train-type.enum").TrainType;
        id: string;
    }>;
}
