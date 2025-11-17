import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SectorService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: { name: string; prefix: string }) {
    return this.prisma.sector.create({ data });
  }

  list() {
    return this.prisma.sector.findMany();
  }
}
