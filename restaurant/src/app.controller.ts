import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { categorys, foods, menu } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('create_res')
  handleCreate(@Payload() data) {
    return this.appService.proccessCreate(data);
  }
  @MessagePattern('get_res')
  handleGetDetail(@Payload() data) {
    return this.appService.proccessDetail(data);
  }
  @MessagePattern('get_res_all')
  handleGetAll(@Payload() data) {
    
    return this.appService.proccessFindAll();
  }
  @MessagePattern('create_menu')
  handleMenu(@Payload() data:menu) {
    return this.appService.proccessMenu(data);
  }
  
  @MessagePattern('create_cate')
  handleCate(@Payload() data:categorys) {
    return this.appService.proccessCate(data);
  }
  @MessagePattern('create-food')
  handleFood(@Payload() data:foods) {
    return this.appService.proccessFood(data);
  }
  @MessagePattern('get_res_elastic')
  handleres() {
    return this.appService.proccequery();
  }
  @MessagePattern('search_by_name')
  async handleSearchByName(@Payload() data) {
   
   
    return await this.appService.searchByName(data);
  }
}
