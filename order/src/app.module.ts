import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [PrismaModule,ClientsModule.register([{
    name:'EMAIL_SERVICE',
    transport:Transport.RMQ,
    options:{
      urls:['amqp://admin:1234@some-rabbit:5672'],
      queue:'sendemail_queue',
      queueOptions:{
        durable:false
      }
    }
  },
  {
    name:'SHIPPING_SERVICE',
    transport:Transport.RMQ,
    options:{
      urls:['amqp://admin:1234@some-rabbit:5672'],
      queue:'shipping_queue',
      queueOptions:{
        durable:false
      }
    }
  },

])],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
