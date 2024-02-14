import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { PrismaService } from '../prisma/prisma.service';
import { NewsService } from './news.service';
import { UserService } from '../user/user.service';
import { CategoriesService } from '../categories/categories.service';

@Module({
  controllers: [NewsController],
  providers: [PrismaService, NewsService, UserService, CategoriesService],
  exports: [NewsService],
})
export class NewsModule {}
