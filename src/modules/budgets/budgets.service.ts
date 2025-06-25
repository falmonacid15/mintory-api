import { Injectable } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { PrismaService } from '../../prisma.service';
import { CrudResponse } from '../../types/responses/crud.response';
import { Budget, Prisma } from '@prisma/client';
import { PaginatedResponse } from '../../types/responses/paginated.response';

@Injectable()
export class BudgetsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateBudgetDto): Promise<CrudResponse<Budget>> {
    const newBudget = await this.prisma.budget.create({ data });

    return {
      message: 'Presupuesto creado exitosamente',
      data: newBudget,
    };
  }

  async findAll(
    page?: number,
    perPage?: number,
    where?: Prisma.BudgetWhereUniqueInput,
    orderBy?: Prisma.BudgetOrderByWithRelationInput,
  ): Promise<PaginatedResponse<Budget>> {
    page = page || 1;
    perPage = perPage || 10;

    const skip = (page - 1) * perPage;
    const take = perPage;

    const [data, totalCount] = await this.prisma.$transaction([
      this.prisma.budget.findMany({ where, orderBy, skip, take }),
      this.prisma.budget.count({ where }),
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

  async findOne(where: Prisma.BudgetWhereUniqueInput): Promise<Budget | null> {
    return await this.prisma.budget.findUnique({ where });
  }

  async update(
    where: Prisma.BudgetWhereUniqueInput,
    data: UpdateBudgetDto,
  ): Promise<CrudResponse<Budget>> {
    const updatedBudget = await this.prisma.budget.update({ where, data });

    return {
      message: 'Presupuesto actualizado exitosamente',
      data: updatedBudget,
    };
  }

  async remove(
    where: Prisma.BudgetWhereUniqueInput,
  ): Promise<CrudResponse<Budget>> {
    const deletedBudget = await this.prisma.budget.delete({ where });
    return {
      message: 'Presupuesto eliminado exitosamente',
      data: deletedBudget,
    };
  }
}
