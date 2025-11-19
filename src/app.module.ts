import { Module } from '@nestjs/common';
import { PasswordModule } from './password/password.module';
import { SectorModule } from './sector/sector.module';
import { PrismaService } from './prisma.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    PasswordModule,
    SectorModule,
     ScheduleModule.forRoot(),
  ],
  providers: [PrismaService],
})
export class AppModule {}
