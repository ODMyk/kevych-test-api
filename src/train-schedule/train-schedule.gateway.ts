import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ScheduleChangeEventPayload } from 'src/common/dtos/schedule-event-payload.dto';
import { ENVIRONMENT_VARIABLES } from 'src/constants/environment';
import { JwtPayloadDto } from '../auth/dtos/auth.dto';
import { UsersService } from '../users/users.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
  namespace: '/train-updates',
})
export class TrainScheduleGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  afterInit() {}

  async handleConnection(client: Socket) {
    const token = client.handshake.query.token as string;

    if (!token) {
      client.disconnect(true);
      return;
    }

    try {
      const payload: JwtPayloadDto = this.jwtService.verify(token, {
        secret: this.configService.get<string>(
          ENVIRONMENT_VARIABLES.JWT_SECRET,
        ),
      });

      const user = await this.usersService.findOneById(payload.sub);
      if (!user) {
        throw new UnauthorizedException(
          'User associated with token not found.',
        );
      }

      client['user'] = {
        id: user.id,
        email: user.email,
        roles: user.roles,
      };

      client.emit('connected', {
        message: 'Successfully connected to real-time updates!',
        userId: user.id,
      });

      await client.join('authenticated-users');
    } catch (error) {
      console.error(error);
      client.disconnect(true);
    }
  }

  handleDisconnect() {}

  public emitScheduleChange(payload: ScheduleChangeEventPayload): void {
    this.server.to('authenticated-users').emit('schedule:changed', payload);
  }
}
