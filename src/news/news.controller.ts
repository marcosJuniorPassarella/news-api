import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNewsDto } from './dtos/CreateNews.dto';
import { News } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { NewsService } from './news.service';
import { CategoriesService } from 'src/categories/categories.service';

@Controller('news')
export class NewsController {
  constructor(
    private userService: UserService,
    private newsService: NewsService,
    private categoriesService: CategoriesService,
  ) {}

  @UsePipes(ValidationPipe)
  @Post()
  public async store(@Body() createNews: CreateNewsDto): Promise<News> {
    const { author_id, category_id } = createNews;
    const findUserById = await this.userService.findById(author_id);
    if (!findUserById) throw new NotFoundException('User not found');
    const findCategoryById = await this.categoriesService.findById(category_id);
    if (!findCategoryById) throw new NotFoundException('Category not found');

    const news = await this.newsService.create(createNews);
    return news;
  }

  @Get()
  public async index(): Promise<News[]> {
    const newsList = this.newsService.findAll();
    return newsList;
  }

  @Get('/:id')
  public async show(@Param('id') id: string): Promise<News> {
    const findNew = await this.newsService.findById(id);
    if (!findNew) throw new NotFoundException('New not found');
    return findNew;
  }
}
