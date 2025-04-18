-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS categorys_id_seq;

-- Table Definition
CREATE TABLE "public"."categorys" (
    "id" int4 NOT NULL DEFAULT nextval('categorys_id_seq'::regclass),
    "name" varchar(255) NOT NULL,
    "id_menu" int4 NOT NULL,
    CONSTRAINT "fk_categorys_user" FOREIGN KEY ("id_menu") REFERENCES "public"."menu"("id") ON DELETE CASCADE,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS customer_id_seq;

-- Table Definition
CREATE TABLE "public"."customer" (
    "id" int4 NOT NULL DEFAULT nextval('customer_id_seq'::regclass),
    "name" varchar(255) NOT NULL,
    "address" text,
    "age" int4,
    "phone" varchar(20),
    "email" varchar(120),
    "id_user" int4 NOT NULL,
    CONSTRAINT "fk_customer_user" FOREIGN KEY ("id_user") REFERENCES "public"."users"("id") ON DELETE CASCADE,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX customer_phone_key ON public.customer USING btree (phone)
CREATE UNIQUE INDEX customer_email_key ON public.customer USING btree (email)
CREATE UNIQUE INDEX customer_id_user_key ON public.customer USING btree (id_user);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."detail_order" (
    "id_order" int4 NOT NULL,
    "id_food" int4 NOT NULL,
    "price" float8 NOT NULL,
    "soluong" int4 NOT NULL,
    CONSTRAINT "fk_ct_food_user" FOREIGN KEY ("id_food") REFERENCES "public"."foods"("id") ON DELETE CASCADE,
    CONSTRAINT "fk_ct_orders_user" FOREIGN KEY ("id_order") REFERENCES "public"."orders"("id") ON DELETE CASCADE,
    PRIMARY KEY ("id_order","id_food")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS foods_id_seq;

-- Table Definition
CREATE TABLE "public"."foods" (
    "id" int4 NOT NULL DEFAULT nextval('foods_id_seq'::regclass),
    "name" varchar(255) NOT NULL,
    "price" float8 NOT NULL,
    "description" text,
    "image" text,
    "id_cate" int4 NOT NULL,
    CONSTRAINT "fk_food_user" FOREIGN KEY ("id_cate") REFERENCES "public"."menu"("id") ON DELETE CASCADE,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS menu_id_seq;

-- Table Definition
CREATE TABLE "public"."menu" (
    "id" int4 NOT NULL DEFAULT nextval('menu_id_seq'::regclass),
    "name" varchar(255) NOT NULL,
    "id_res" int4 NOT NULL,
    CONSTRAINT "fk_menu_user" FOREIGN KEY ("id_res") REFERENCES "public"."restaurants"("id") ON DELETE CASCADE,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS orders_id_seq;

-- Table Definition
CREATE TABLE "public"."orders" (
    "id" int4 NOT NULL DEFAULT nextval('orders_id_seq'::regclass),
    "date" timestamp DEFAULT CURRENT_TIMESTAMP,
    "trangthai" varchar(50) NOT NULL,
    "id_customer" int4 NOT NULL,
    CONSTRAINT "fk_order_user" FOREIGN KEY ("id_customer") REFERENCES "public"."customer"("id") ON DELETE CASCADE,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS owner_restaurants_id_seq;

-- Table Definition
CREATE TABLE "public"."owner_restaurants" (
    "id" int4 NOT NULL DEFAULT nextval('owner_restaurants_id_seq'::regclass),
    "name" varchar(255) NOT NULL,
    "address" text,
    "age" int4,
    "phone" varchar(20),
    "email" varchar(120),
    "id_user" int4 NOT NULL,
    CONSTRAINT "fk_customer_user" FOREIGN KEY ("id_user") REFERENCES "public"."users"("id") ON DELETE CASCADE,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX owner_restaurants_phone_key ON public.owner_restaurants USING btree (phone)
CREATE UNIQUE INDEX owner_restaurants_email_key ON public.owner_restaurants USING btree (email)
CREATE UNIQUE INDEX owner_restaurants_id_user_key ON public.owner_restaurants USING btree (id_user);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS restaurants_id_seq;

-- Table Definition
CREATE TABLE "public"."restaurants" (
    "id" int4 NOT NULL DEFAULT nextval('restaurants_id_seq'::regclass),
    "name" varchar(255) NOT NULL,
    "address" text NOT NULL,
    "phone" varchar(20) NOT NULL,
    "email" varchar(120),
    "id_owner" int4 NOT NULL,
    "image" text,
    CONSTRAINT "fk_restaurants_user" FOREIGN KEY ("id_owner") REFERENCES "public"."owner_restaurants"("id") ON DELETE CASCADE,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS shipping_id_seq;

-- Table Definition
CREATE TABLE "public"."shipping" (
    "id" int4 NOT NULL DEFAULT nextval('shipping_id_seq'::regclass),
    "date" timestamp DEFAULT CURRENT_TIMESTAMP,
    "trangthai" text,
    "id_customer" int4,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_id_seq;

-- Table Definition
CREATE TABLE "public"."users" (
    "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    "taikhoan" varchar(120) NOT NULL,
    "matkhau" text NOT NULL,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX users_taikhoan_key ON public.users USING btree (taikhoan);
