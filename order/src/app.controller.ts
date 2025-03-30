import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService
    
  ) {}

  @MessagePattern('order_food')
  handleOrder(data) {
    console.log(data)
    return this.appService.proccessOrder(data);
  }
}
