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

  public async findAll(): Promise<News[]> {
    const newsList = this.prismaService.news.findMany();
    return newsList;
  }

  public async findById(id: string): Promise<News | null> {
    const findNewById = this.prismaService.news.findFirst({
      where: { id },
    });
    return findNewById;
  }

  public async findByCategory(category_id: string): Promise<News | null> {
    const findNewByCategory = await this.prismaService.news.findFirst({
      where: { category_id },
    });
    return findNewByCategory;
  }
}
