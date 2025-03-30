bước đầu sau khi docker compose xong phải chạy elastic trước rùi mới chạy những trường còn lại 
bước 2 config như ở dưới 
bước 3 cho chạy lại những service


/// elasticsearch
đầu tiên vào phải reset lại password  
/// lấy token rùi dán vào kibana 
/// logstash thì đã được đồng bộ build nên k cần phải config chỉ
/// file script của postgres chạy không được mình có thể import file này link : https://drive.google.com/file/d/1JqsCQrU7MWAHh1IK9Sj_Bt4bwvc8558x/view?usp=sharing


// hướng dẫn sử dụng api 
phải có token thì mới sử dụng đc những trường còn lại 
mỗi token đều phải có Bearer
localhost:8080/

một số tính năng như tạo res, cate, menu , tạo user rùi cập nhập user theo 2 trường là customer, or owner restaurant ,
gửi email, shipping,và order 
tính năng nổi bật như xử lý bảo mật trước khi gửi message phải kiểm tra token





  @UseGuards(AuthGuard)
post : create-user 

{
    "taikhoan":"duphuoc",
    "matkhau":"idoldeptrai"
}
  @UseGuards(AuthGuard)
post : login-user
{
{
    "taikhoan":"duphuoc",
    "matkhau":"idoldeptrai"
}

// thêm restaurant 
  @UseGuards(AuthGuard)
post :/restaurant/create
{
    "name":"Bánh Xèo Miền tây",
    "address":"quóc lộ cà mau, p5, thành phố cà mau",
    "phone":"0916616077",
    "email":"phuocdufavn@gmail.com",
    "id_owner":1,
    "image":"'/fdsfsdfdsfsds"
}
// lấy chi tiết res
  @UseGuards(AuthGuard)
post: restaurant/getdetail/:id


  @UseGuards(AuthGuard)
@Get restaurant/getallres

  @UseGuards(AuthGuard)
@Get restaurant/get-elastic

// tạo menu 


 @UseGuards(AuthGuard)
  @Post('restaurant/create-menu')

{
    "name":"Buổi sáng",
    "id_res":1
}



// tạo cate
  @UseGuards(AuthGuard)
  @Post('restaurant/create-cate')

{
    "name":"bún",
    "id_menu":1
}
// tạo đồ ăn
Post : /restaurant/create-food 

{
     "name": "Bún nước lèo",
 
    "price": 40000,
    "description": "bì,cá,rau mùi",
    "image":"fdfsd",
    "id_cate": 1


}

post /order
Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwMDAxLCJ0YWlraG9hbiI6ImR1cGh1b2MiLCJpYXQiOjE3NDMzNDg1OTQsImV4cCI6MTc0MzM1MjE5NH0.aEt9WWCg7cR8ylLj-6PzYP6x3MGcoHzQGTK6exbLbIFuzRVZPcwZi2KftOadNLiTT3-R8WJT9g96qINfuO5ceMMkUCRgBc3fgv35NGqKJjhZ7VmiJWd9zkHCTEtCwf6LrRppc054Qj9kr5dMNEPF-Dfp27nO6SKmZLc__c5KV6L3V9Qc_fFgibcSf69S45yQwfT8uBWbEeaSt985iqgnXAyrHQ2cTru8diFMV43lZ4YEKYsv4Ynxq6La2T8pco2tzc6dBgLzAzSHG-bo6kvweZzIcN4nWP4eaUbDEbtlOV1ZH3_y9pphqFDwVwgMKQpYBuL9hDdLrRJqX5N1MMYQzw
{
    "trangthai": "đang giao",
    "id_customer": 2,
    "id_food": 2,
    "price": 43423,
    "soluong": 1,
    "email": "phuocdufavn@gmail.com"
}



