import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private prismaService:PrismaService
  ) {}

  @EventPattern('send_shipping')
  getHello(data) {

  return this.prismaService.shipping.create({
    data
  });
  }
}
