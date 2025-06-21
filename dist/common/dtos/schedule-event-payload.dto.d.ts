import { ScheduleResponseDto } from 'src/schedules/dtos/shedule.dto';
export declare class ScheduleChangeEventPayload {
    changeType: 'created' | 'updated' | 'deleted';
    schedule?: ScheduleResponseDto;
    scheduleId?: string;
}
