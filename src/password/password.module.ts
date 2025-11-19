import { Module } from '@nestjs/common';
import { PasswordGateway } from './password.gateway';
import { PasswordService } from './password.service';
import { PrismaService } from '../prisma.service';
import { PasswordCleanerService } from './password-cleaner.service';
import { PasswordController } from './password.controller';

@Module({
  controllers: [PasswordController],
  providers: [PasswordGateway, PasswordService, PrismaService, PasswordCleanerService],
})
export class PasswordModule {}
