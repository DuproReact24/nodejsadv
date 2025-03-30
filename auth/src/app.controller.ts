import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'validate_token' })
  handleToken(@Payload() data:{token:string}) {
    return this.appService.validateToken(data);
  }
}
