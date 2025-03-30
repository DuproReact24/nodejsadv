import { Injectable } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';
import { PrismaService } from './prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private prismaService:PrismaService,
    private configservice:ConfigService
  ) {}

  async validateToken(data: { token: string }) {
 
    try {
     
      const privateKey = this.configservice.get<string>('private_key');
 
      if (!privateKey) {
        throw new Error('Private key is not defined');
      }

      const decoded = jwt.verify(data.token, privateKey) as unknown as { userId: string; role: string };
 

      const permissions = await this.prismaService.customer.findFirst({
        where: { id: +decoded.userId },
      });

      return {
        isValid: true,
        user: { userId: decoded.userId, role: decoded.role, permissions },
      };
    } catch (error) {
      console.log(error)
      return { isValid: false };
    }
  }
}