import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNewsDto } from './dtos/CreateNews.dto';
import { News } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { NewsService } from './news.service';
import { CategoriesService } from 'src/categories/categories.service';
import { UpdateNewsDto } from './dtos/UpdateNews.dto';

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

  @UsePipes(ValidationPipe)
  @Put('/:id')
  public async update(
    @Body() newsData: UpdateNewsDto,
    @Param('id') id: string,
  ): Promise<News> {
    if (!newsData) throw new BadRequestException('News data is required');
    const findNewById = await this.newsService.findById(id);
    if (!findNewById) throw new NotFoundException('New not found');
    const categoryExists = await this.categoriesService.findById(
      newsData?.category_id,
    );
    if (!categoryExists) throw new NotFoundException('Category not found');
    const updatedNew = await this.newsService.update({
      id,
      newsData,
    });
    return updatedNew;
  }
}
