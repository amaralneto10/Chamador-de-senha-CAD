import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PasswordService } from './password.service';

@WebSocketGateway({
  cors: { origin: '*' }
})
export class PasswordGateway {
  constructor(private readonly service: PasswordService) {}

  @WebSocketServer()
  server: Server;

  // Chamar próxima senha
  @SubscribeMessage('next')
  async next(@MessageBody() data: { sectorId: number, operator: string }) {
    const result = await this.service.callNext(data.sectorId, data.operator);
    this.server.emit('display-update', result);
  }

  // Repetir senha atual
  @SubscribeMessage('repeat')
  async repeat(@MessageBody() data: { sectorId: number }) {
    const result = await this.service.getCurrent(data.sectorId);
    this.server.emit('display-update', { ...result, repeat: true });
  }
}
