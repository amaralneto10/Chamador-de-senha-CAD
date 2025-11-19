import { Controller, Delete, Param } from '@nestjs/common';
import { PasswordService } from './password.service';

@Controller('password')
export class PasswordController {
  constructor(private readonly service: PasswordService) {}

  @Delete('clear/:sectorId')
  async clear(@Param('sectorId') sectorId: number) {
    return this.service.clearHistory(Number(sectorId));
  }
}
