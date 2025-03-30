import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [PrismaModule,JwtModule.registerAsync({
      imports: [ConfigModule],
        inject: [ConfigService],
    useFactory: async (configService:ConfigService)=>{
      return {
        global:true,
        
        publicKey:configService.get<string>('public_key'),
        privateKey:configService.get<string>('private_key'),
        signOptions:{
          expiresIn:'1h',
          algorithm: 'RS256',
        }
      }
    }
  }),ConfigModule.forRoot({
    isGlobal:true
  })],
  controllers: [AppController],
  providers: [AppService, PrismaService,
  
  ],
})
export class AppModule {}
