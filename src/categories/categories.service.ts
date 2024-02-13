import { Injectable } from '@nestjs/common';
import { Categories, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prismaService: PrismaService) {}

  public async create(data: Prisma.CategoriesCreateInput): Promise<Categories> {
    const newCategory = await this.prismaService.categories.create({
      data,
    });
    return newCategory;
  }

  public async findByName(name: string): Promise<Categories | null> {
    const categorie = await this.prismaService.categories.findFirst({
      where: { name },
    });
    return categorie;
  }

  public async findAll(): Promise<Categories[]> {
    const categories = await this.prismaService.categories.findMany();
    return categories;
  }

  public async findById(id: string): Promise<Categories | null> {
    const categorie = await this.prismaService.categories.findFirst({
      where: { id },
    });
    return categorie;
  }

  public async update(params: {
    id: string;
    data: Prisma.CategoriesUpdateInput;
  }): Promise<Categories> {
    const { id, data } = params;
    const updatedCategory = await this.prismaService.categories.update({
      where: { id },
      data,
    });
    return updatedCategory;
  }

  public async delete(id: string): Promise<Categories> {
    const deletedCategory = await this.prismaService.categories.delete({
      where: { id },
    });
    return deletedCategory;
  }
}
