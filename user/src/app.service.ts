import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { customer, users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'
@Injectable()
export class AppService {
  constructor(private prismaService:PrismaService,
    private readonly jwtService: JwtService,
  ){}
   async proccessUser(data:users) {
   const saltRounds = 10;
     data.matkhau = await bcrypt.hash(data.matkhau, saltRounds);
      return this.prismaService.users.create({
      data
    })
     
  }
 async proccessLogin(data:users){
      if(!data.taikhoan||!data.matkhau){
        return {
          status: 400,
        message: 'Tên tài khoản và mật khẩu không được để trống!',
        }
      }
      const index = await this.prismaService.users.findFirst({
        where:{
          taikhoan:data.taikhoan
        }
      })
      if(!index){
        return {status:404,
          message:"tài khoản không tồn tại!"
        }
      }
      const res =await bcrypt.compare( data.matkhau,index.matkhau)
     
      if(!res){
        return {status:200,
          message:"đăng mật khẩu sai"
        }
      }
 
      const payload = { userId: index.id, taikhoan:data.taikhoan };
      const token = this.jwtService.sign(payload);
      return {status:201,
        message:"đăng Nhập thành công",
        token
      }


    


  }
  
}
