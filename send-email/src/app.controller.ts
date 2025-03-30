import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import * as nodemailer from 'nodemailer'
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('send_email')
 async sendnotifyemail() {
  let configMail = nodemailer.createTransport({
    service:"gmail",
    auth:{
      user:"phuocdufavn@gmail.com",
      pass:"htgehetndpkaikdk"
    }
  })
    const info = await configMail.sendMail({
      from :"phuocdufavn@gmail.com", 
      to: "phuocdufavn@gmail.com", 
      subject: "Hello ✔", 
      text: "Xin Chào", 
      html: "<b>Bạn đang đặt hàng</b>", 
    });
 
   
  }
  @EventPattern('send_email_done')
  async sendsuccessemail(data) {
 const {email,index}= data
    let configMail = nodemailer.createTransport({
      service:"gmail",
      auth:{
        user:"phuocdufavn@gmail.com",
        pass:"htgehetndpkaikdk"
      }
    })
      const info = await configMail.sendMail({
        from :"phuocdufavn@gmail.com", 
        to: `${email}`, 
        subject: "Hello ✔", 
        text: "Xin Chào", 
        html: `<p>Bạn đang đặt hàng mã hóa đơn là ${index.id}</p> </br>
              <p>trạng thái: ${index.trangthai}</p></br>
              <p>ngày giao ${index.date}</p></br>
        `, 
      });
   
     
    }
}
