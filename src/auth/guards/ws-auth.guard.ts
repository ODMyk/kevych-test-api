import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io'; // Import Socket from socket.io

@Injectable()
export class WsAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Get the client socket instance from the WebSocket context
    const client: Socket = context.switchToWs().getClient();

    // If no user object is found, the connection is not authenticated
    if (!client['user']) {
      throw new UnauthorizedException(
        'WebSocket connection not authenticated.',
      );
    }

    // If authenticated, allow access to the WebSocket event handler
    return true;
  }
}
