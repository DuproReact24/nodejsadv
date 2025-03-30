FROM node:20

WORKDIR /root/send-email

COPY package.json .

RUN yarn config set network-timeout 3000000

RUN yarn install

COPY . .


RUN yarn run build


CMD ["yarn" ,"start:prod"]