import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ClientsModule.register([{
    name:'USER_SERVICE',
    transport:Transport.RMQ,
    options:{
      urls:['amqp://admin:1234@some-rabbit:5672'],
      queue:'user_queue',
      queueOptions:{
        durable:false
      }
    }
  },
  {
    name:'AUTH_SERVICE',
    transport:Transport.RMQ,
    options:{
      urls:['amqp://admin:1234@some-rabbit:5672'],
      queue:'auth_queue',
      queueOptions:{
        durable:false
      }
    }
  },
  {
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
    name:'RESTAURANT_SERVICE',
    transport:Transport.RMQ,
    options:{
      urls:['amqp://admin:1234@some-rabbit:5672'],
      queue:'res_queue',
      queueOptions:{
        durable:false
      }
    }
  },
  {
    name:'ORDER_SERVICE',
    transport:Transport.RMQ,
    options:{
      urls:['amqp://admin:1234@some-rabbit:5672'],
      queue:'order_queue',
      queueOptions:{
        durable:false
      }
    }
  },
])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
