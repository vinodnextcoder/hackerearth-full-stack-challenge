import { Server } from 'socket.io';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  newMatch(data: unknown): void {
    this.server.emit('newMatch', data);
  }

  billEvent(data: unknown): void {
    this.server.emit('bill', data);
  }
}
