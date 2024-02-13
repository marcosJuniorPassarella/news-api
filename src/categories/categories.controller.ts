import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Categories } from '@prisma/client';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/createCategory.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

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
}
