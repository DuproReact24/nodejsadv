import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ClientProxy } from '@nestjs/microservices';


@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService,
    @Inject('EMAIL_SERVICE') private emailService:ClientProxy,
    @Inject('SHIPPING_SERVICE') private shippingService:ClientProxy
  ) {}
  async proccessOrder(data) {
    const { trangthai, id_food, price, soluong, id_customer,email } = data;
    const payload = { trangthai, id_food, price, soluong, id_customer }
    this.emailService.emit('send_email',"")
    try {
      const index = await this.prismaService.orders.create({
        data: {
          trangthai,
          id_customer,
          detail_order: {
            create: {
              price,
              soluong,
              id_food,
            },
          },
        },
      });
   
      if(index){
        this.shippingService.emit('send_shipping',index)
        this.emailService.emit('send_email_done',{index,email})
      }
      return index;
    } catch (error) {
      
    }
  }
}
