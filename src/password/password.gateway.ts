import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PasswordService } from './password.service';

@WebSocketGateway({
  cors: { origin: '*' }
})
export class PasswordGateway {
  constructor(private readonly service: PasswordService) {}

  @WebSocketServer()
  server!: Server;

  // Quando a TV conecta → envia histórico inicial
  handleConnection(client: Socket) {
    console.log("TV/Client conectado:", client.id);
  }

  // ---------- GET INITIAL HISTORY ----------
  @SubscribeMessage("get-history")
  async getHistory(
    @MessageBody() data: { sectorId: number },
    @ConnectedSocket() client: Socket
  ) {
    const history = await this.service.history(data.sectorId);
    client.emit("update-history", history);
  }

  // ---------- NEXT ----------
  @SubscribeMessage("next")
  async next(@MessageBody() data: { sectorId: number; operator: string }) {
    const result = await this.service.callNext(data.sectorId, data.operator);

    // Atualiza a TV
    this.server.emit("display-update", result);

    // Atualiza histórico
    const history = await this.service.history(data.sectorId);
    this.server.emit("update-history", history);
  }

  // ---------- REPEAT ----------
  @SubscribeMessage("repeat")
  async repeat(@MessageBody() data: { sectorId: number }) {
    const result = await this.service.getCurrent(data.sectorId);

    if (!result) return;

    // Novo evento só para repetir
    this.server.emit("repeat-display", result);
  }
}
