import { Module } from '@nestjs/common';
import { PasswordGateway } from './password.gateway';
import { PasswordService } from './password.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [PasswordGateway, PasswordService, PrismaService],
})
export class PasswordModule {}
