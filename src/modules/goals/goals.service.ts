import { Injectable } from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { PrismaService } from '../../prisma.service';
import { CrudResponse } from '../../types/responses/crud.response';
import { Goal, Prisma } from '@prisma/client';
import { PaginatedResponse } from '../../types/responses/paginated.response';

@Injectable()
export class GoalsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateGoalDto): Promise<CrudResponse<Goal>> {
    const newGoal = await this.prisma.goal.create({
      data,
    });
    return {
      message: 'Meta creada exitosamente',
      data: newGoal,
    };
  }

  async findAll(
    page?: number,
    perPage?: number,
    where?: Prisma.GoalWhereUniqueInput,
    orderBy?: Prisma.GoalOrderByWithRelationInput,
  ): Promise<PaginatedResponse<Goal>> {
    page = page || 1;
    perPage = perPage || 10;

    const skip = (page - 1) * perPage;
    const take = perPage;

    const [data, totalCount] = await this.prisma.$transaction([
      this.prisma.goal.findMany({ where, orderBy, skip, take }),
      this.prisma.goal.count({ where }),
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

  async findOne(where: Prisma.GoalWhereUniqueInput): Promise<Goal | null> {
    return await this.prisma.goal.findUnique({
      where,
    });
  }

  async update(
    where: Prisma.GoalWhereUniqueInput,
    data: UpdateGoalDto,
  ): Promise<CrudResponse<Goal>> {
    const updatedGoal = await this.prisma.goal.update({
      data,
      where,
    });

    return {
      message: 'Meta actualizada exitosamente',
      data: updatedGoal,
    };
  }

  async remove(
    where: Prisma.GoalWhereUniqueInput,
  ): Promise<CrudResponse<Goal>> {
    const deletedGoal = await this.prisma.goal.delete({
      where,
    });
    return {
      message: 'Meta eliminada exitosamente',
      data: deletedGoal,
    };
  }
}
