import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PasswordService {
  constructor(private readonly prisma: PrismaService) {}

  async callNext(sectorId: number, operator: string) {
    const last = await this.prisma.history.findFirst({
      where: { sectorId },
      orderBy: { number: 'desc' },
    });

    const nextNumber = last ? last.number + 1 : 1;

    const saved = await this.prisma.history.create({
      data: {
        sectorId,
        number: nextNumber,
        calledBy: operator,
      },
    });

    return saved;
  }

  async getCurrent(sectorId: number) {
    return this.prisma.history.findFirst({
      where: { sectorId },
      orderBy: { number: 'desc' },
    });
  }

  async history(sectorId: number) {
    return this.prisma.history.findMany({
      where: { sectorId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
