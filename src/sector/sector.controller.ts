import { Controller, Get, Post, Body } from '@nestjs/common';
import { SectorService } from './sector.service';
import { CreateSectorDto } from './dto/create-sector.dto';

@Controller('sector')
export class SectorController {
  constructor(private readonly service: SectorService) {}

  @Post()
  create(@Body() body: CreateSectorDto) {
    return this.service.create(body);
  }

  @Get()
  list() {
    return this.service.list();
  }
}
