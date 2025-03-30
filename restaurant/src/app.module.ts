import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ElasticModule } from './elastic/elastic.module';
@Module({
  imports: [PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true
      }),
    CacheModule.register({
     store: redisStore,
      host: 'some-redis',
      port: 6379,
      auth_pass:1234,
      ttl: 5, 
      isGlobal: true,
 
    
      
      }),
    
    ElasticModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
