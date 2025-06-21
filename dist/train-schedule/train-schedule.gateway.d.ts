import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ScheduleChangeEventPayload } from 'src/common/dtos/schedule-event-payload.dto';
import { UsersService } from '../users/users.service';
export declare class TrainScheduleGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly jwtService;
    private readonly configService;
    private readonly usersService;
    server: Server;
    constructor(jwtService: JwtService, configService: ConfigService, usersService: UsersService);
    afterInit(): void;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(): void;
    emitScheduleChange(payload: ScheduleChangeEventPayload): void;
}
