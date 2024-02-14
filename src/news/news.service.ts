import { Injectable } from '@nestjs/common';
import { News, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateNewsDto } from './dtos/UpdateNews.dto';

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

  public async update(params: {
    id: string;
    newsData: UpdateNewsDto;
  }): Promise<News> {
    const { id, newsData } = params;
    const { title, content, category_id } = newsData;
    const updatedNew = await this.prismaService.news.update({
      where: { id },
      data: { title, content, category_id },
    });
    return updatedNew;
  }
}
