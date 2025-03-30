import { Body, Controller, Get, Inject, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { AuthGuard } from './auth.guard';

@Controller()
export class AppController {
  constructor(@Inject('USER_SERVICE') private userService:ClientProxy,
  @Inject('RESTAURANT_SERVICE') private resService:ClientProxy,
  @Inject('ORDER_SERVICE') private orderService:ClientProxy,
) {}



  @Post('create-user')
  login(@Body() body){
    const result = lastValueFrom(this.userService.send('user_service', body));
    return result;
  }
  
  @Post('login-user')
 async signIn(@Body() body){
    const result = await lastValueFrom(this.userService.send('user_login', body));
    
    return result;
  }
   

  // restaurant
  @Post('restaurant/create')
  async createRes(@Body() body){
    const result = await lastValueFrom(this.resService.send('create_res', body));
    
    return result;
  }
  @UseGuards(AuthGuard)
  @Get('restaurant/getdetail/:id')
  async getByid(@Param('id') id){

    const result = await lastValueFrom(this.resService.send('get_res', id));
    
    return result;
  }
  @UseGuards(AuthGuard)
  @Get('restaurant/getallres')
  async getAll(){


    const result = await lastValueFrom(this.resService.send('get_res_all', ""));
    
    return result;
  }

  @UseGuards(AuthGuard)
  @Get('restaurant/get-elastic')
  async getEl(){
 

    const result = await lastValueFrom(this.resService.send('get_res_elastic', ""));
    
    return result;
  }
  @UseGuards(AuthGuard)
  @Get('restaurant/search-res')
  async searchByname(@Query('name') body){
     const result = await lastValueFrom(this.resService.send('search_by_name', body));
     
     return result;
 
   }

   @UseGuards(AuthGuard)
  @Post('restaurant/create-menu')
  async createMenu(@Body() body){
    const result = await lastValueFrom(this.resService.send('create_menu',body));
    
    return result;

  }
  

  @UseGuards(AuthGuard)
  @Post('restaurant/create-cate')
  async createCate(@Body() body){
    const result = await lastValueFrom(this.resService.send('create_cate', body));
    
    return result;

  }


  @UseGuards(AuthGuard)
  @Post('restaurant/create-food')
 async createFood(@Body() body){
    const result = await lastValueFrom(this.resService.send('create-food', body));
    
    return result;

  }

  @UseGuards(AuthGuard)
  @Post('order')
  async createOrder(@Body() body){

    const result = await lastValueFrom(this.orderService.send('order_food', body));
    
    return result;
  }
 
}
