import {
  BadRequestException,
  Body,
  Controller,
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
}
