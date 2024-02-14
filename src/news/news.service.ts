import { Injectable } from '@nestjs/common';
import { News, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NewsService {
  constructor(private prismaService: PrismaService) {}

  public async create(
    newsData: Prisma.NewsUncheckedCreateInput,
  ): Promise<News> {
    const news = await this.prismaService.news.create({
      data: newsData,
    });
    return news;
  }
}
