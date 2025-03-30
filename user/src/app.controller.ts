import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { customer, users } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('user_service')
  handleCreate(@Payload() data:users) {
    return this.appService.proccessUser(data);
  }
  @MessagePattern('user_login')
  handleLogin(@Payload() data:users) {
    return this.appService.proccessLogin(data);
  }
}
