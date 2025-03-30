-- CreateTable
CREATE TABLE "categorys" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "id_menu" INTEGER NOT NULL,

    CONSTRAINT "categorys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "address" TEXT,
    "age" INTEGER,
    "phone" VARCHAR(20),
    "email" VARCHAR(120),
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foods" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "id_cate" INTEGER NOT NULL,

    CONSTRAINT "foods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "id_res" INTEGER NOT NULL,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "trangthai" VARCHAR(50) NOT NULL,
    "id_customer" INTEGER NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "owner_restaurants" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "address" TEXT,
    "age" INTEGER,
    "phone" VARCHAR(20),
    "email" VARCHAR(120),
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "owner_restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurants" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "address" TEXT NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "email" VARCHAR(120),
    "id_owner" INTEGER NOT NULL,
    "image" TEXT,

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "taikhoan" VARCHAR(120) NOT NULL,
    "matkhau" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detail_order" (
    "id_order" INTEGER NOT NULL,
    "id_food" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "soluong" INTEGER NOT NULL,

    CONSTRAINT "detail_order_pkey" PRIMARY KEY ("id_order","id_food")
);

-- CreateTable
CREATE TABLE "shipping" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "trangthai" TEXT,
    "id_customer" INTEGER,

    CONSTRAINT "shipping_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_phone_key" ON "customer"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "customer_email_key" ON "customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customer_id_user_key" ON "customer"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "owner_restaurants_phone_key" ON "owner_restaurants"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "owner_restaurants_email_key" ON "owner_restaurants"("email");

-- CreateIndex
CREATE UNIQUE INDEX "owner_restaurants_id_user_key" ON "owner_restaurants"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "users_taikhoan_key" ON "users"("taikhoan");

-- AddForeignKey
ALTER TABLE "categorys" ADD CONSTRAINT "fk_categorys_user" FOREIGN KEY ("id_menu") REFERENCES "menu"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "fk_customer_user" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "foods" ADD CONSTRAINT "fk_food_user" FOREIGN KEY ("id_cate") REFERENCES "menu"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menu" ADD CONSTRAINT "fk_menu_user" FOREIGN KEY ("id_res") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "fk_order_user" FOREIGN KEY ("id_customer") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "owner_restaurants" ADD CONSTRAINT "fk_customer_user" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "restaurants" ADD CONSTRAINT "fk_restaurants_user" FOREIGN KEY ("id_owner") REFERENCES "owner_restaurants"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detail_order" ADD CONSTRAINT "fk_ct_food_user" FOREIGN KEY ("id_food") REFERENCES "foods"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detail_order" ADD CONSTRAINT "fk_ct_orders_user" FOREIGN KEY ("id_order") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
