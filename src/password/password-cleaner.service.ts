import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PasswordCleanerService {
  private readonly logger = new Logger(PasswordCleanerService.name);

  constructor(private prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async clearDaily() {
    await this.prisma.history.deleteMany({});
    this.logger.log('Histórico de senhas limpo automaticamente (00:00).');
  }
}
