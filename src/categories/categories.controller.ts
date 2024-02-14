import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Categories } from '@prisma/client';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/createCategory.dto';
import { NewsService } from '../news/news.service';

@Controller('categories')
export class CategoriesController {
  constructor(
    private categoriesService: CategoriesService,
    private newsService: NewsService,
  ) {}

  @UsePipes(ValidationPipe)
  @Post()
  public async store(
    @Body() createCategory: CreateCategoryDto,
  ): Promise<Categories> {
    if (!createCategory?.name)
      throw new BadRequestException('Name is required');

    const findCategoryByName = await this.categoriesService.findByName(
      createCategory.name,
    );
    if (findCategoryByName)
      throw new BadRequestException('This category name is not available');

    const newCategory = await this.categoriesService.create(createCategory);
    return newCategory;
  }

  @UsePipes(ValidationPipe)
  @Put('/:id')
  public async update(
    @Body() categoryDatas: CreateCategoryDto,
    @Param('id') id: string,
  ): Promise<Categories> {
    if (!categoryDatas?.name) throw new BadRequestException('Name is required');

    const categoryById = await this.categoriesService.findById(id);
    if (!categoryById) throw new NotFoundException('Category not found');

    if (categoryDatas?.name !== categoryById?.name) {
      const categoryByName = await this.categoriesService.findByName(
        categoryDatas?.name,
      );

      if (categoryByName !== null)
        throw new BadRequestException('This name is not available');
    } else {
      throw new BadRequestException(
        'The name entered is the same as the current one',
      );
    }

    const categoryUpdated = await this.categoriesService.update({
      id,
      data: categoryDatas,
    });
    return categoryUpdated;
  }

  @Get()
  public async index(): Promise<Categories[]> {
    const categories = await this.categoriesService.findAll();
    return categories;
  }

  @Get('/:id')
  public async show(@Param('id') id: string): Promise<Categories> {
    const category = await this.categoriesService.findById(id);
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  @Delete('/:id')
  @HttpCode(204)
  public async delete(@Param('id') id: string): Promise<void> {
    const categoryById = await this.categoriesService.findById(id);
    if (!categoryById) throw new NotFoundException('Category not found');
    const findCategoryInNews = await this.newsService.findByCategory(id);
    if (findCategoryInNews)
      throw new BadRequestException('Cannot remove a category in use');
    await this.categoriesService.delete(id);
  }
}
