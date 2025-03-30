import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { categorys, foods, menu } from '@prisma/client';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class AppService {
  constructor(
    private prismaService: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private elasticsearch: ElasticsearchService,
  ) {}
  async proccessCreate(data) {
    try {
      const result = await this.prismaService.restaurants.create({
        data,
      });
      return result;
    } catch (error) {}
  }
  async proccessDetail(data) {
    try {
      const result = await this.prismaService.restaurants.findFirst({
        where: {
          id: +data,
        },
      });
      if (result === null) {
        return {
          status: 404,
          message: 'not found',
        };
      }
      return {
        status: 201,
        message: 'find success',
        data: result,
      };
    } catch (error) {
      return {
        status: 500,
        message: 'loi sql',
      };
    }
  }
  // tìm find res == redis
  async proccessFindAll() {
    try {
      const res = await this.cacheManager.get('restaurants');

      if (res) {
        return res;
      }
      const result = await this.prismaService.restaurants.findMany({});

      if (!result) {
        return {
          status: 404,
          message: 'not found',
        };
      }

      this.cacheManager.set('restaurants', result);
      return {
        status: 201,
        message: 'find success',
        data: result,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        message: 'loi sql',
      };
    }
  }
  async proccessCate(data: categorys) {
    return await this.prismaService.categorys.create({
      data,
    });
  }

  async proccessMenu(data: menu) {
    return this.prismaService.menu.create({
      data,
    });
  }
  async proccessFood(data: foods) {
    return this.prismaService.foods.create({
      data,
    });
  }
  async proccequery() {
    const data = await this.elasticsearch.search({
      index: 'product-index',
    });

    return data.hits.hits;
  }
  async searchByName(name: string) {
    const result = await this.elasticsearch.search({
      index: 'product-index',
      size: 10, // Số lượng kết quả trả về (có thể điều chỉnh)
      body: {
        query: {
          match: {
            name: name,
          },
        },
      },
    });
    return result.hits.hits;
  }
}
