import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../../prisma.service';
import { CrudResponse } from '../../types/responses/crud.response';
import { Category, Prisma } from '@prisma/client';
import { PaginatedResponse } from '../../types/responses/paginated.response';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCategoryDto): Promise<CrudResponse<Category>> {
    const newCategory = await this.prisma.category.create({ data });

    return {
      message: 'Categoría creada exitosamente',
      data: newCategory,
    };
  }

  async createMany(data: CreateCategoryDto[]) {
    return await this.prisma.category.createMany({ data });
  }

  async findAll(
    page?: number,
    perPage?: number,
    where?: Prisma.CategoryWhereUniqueInput,
    orderBy?: Prisma.CategoryOrderByWithRelationInput,
  ): Promise<PaginatedResponse<Category>> {
    page = page || 1;
    perPage = perPage || 10;

    const skip = (page - 1) * perPage;
    const take = perPage;

    const [data, totalCount] = await this.prisma.$transaction([
      this.prisma.category.findMany({
        where,
        orderBy,
        skip,
        take,
      }),
      this.prisma.category.count({
        where,
      }),
    ]);

    const totalPages = Math.ceil(totalCount / perPage);
    const hasNextPage = totalPages > page;
    const hasPreviousPage = page > 1;

    return {
      meta: {
        totalCount,
        itemsPerPage: perPage,
        totalPages,
        currentPage: page,
        hasNextPage,
        hasPreviousPage,
      },
      data,
    };
  }

  async findOne(
    where: Prisma.CategoryWhereUniqueInput,
  ): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where,
    });
  }

  async update(
    where: Prisma.CategoryWhereUniqueInput,
    data: UpdateCategoryDto,
  ): Promise<CrudResponse<Category>> {
    const updatedCategory = await this.prisma.category.update({
      where,
      data,
    });

    return {
      message: 'Categoría actualizada exitosamente',
      data: updatedCategory,
    };
  }

  async remove(
    where: Prisma.CategoryWhereUniqueInput,
  ): Promise<CrudResponse<Category>> {
    const deletedCategory = await this.prisma.category.delete({
      where,
    });

    return {
      message: 'Categoría eliminada exitosamente',
      data: deletedCategory,
    };
  }
}
