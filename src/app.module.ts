import { Module } from '@nestjs/common';
import { PasswordModule } from './password/password.module';
import { SectorModule } from './sector/sector.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    PasswordModule,
    SectorModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
