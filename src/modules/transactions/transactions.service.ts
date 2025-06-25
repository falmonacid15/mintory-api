import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from '../../prisma.service';
import { Prisma, Transaction } from '@prisma/client';
import { CrudResponse } from '../../types/responses/crud.response';
import { PaginatedResponse } from '../../types/responses/paginated.response';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTransactionDto): Promise<CrudResponse<Transaction>> {
    const newTransaction = await this.prisma.transaction.create({
      data,
    });
    return {
      message: 'Transacción creada exitosamente',
      data: newTransaction,
    };
  }

  async findAll(
    page?: number,
    perPage?: number,
    where?: Prisma.TransactionWhereUniqueInput,
    orderBy?: Prisma.TransactionOrderByWithRelationInput,
  ): Promise<PaginatedResponse<Transaction>> {
    page = page || 1;
    perPage = perPage || 10;

    const skip = (page - 1) * perPage;
    const take = perPage;

    const [data, totalCount] = await this.prisma.$transaction([
      this.prisma.transaction.findMany({ where, orderBy, skip, take }),
      this.prisma.transaction.count({ where }),
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
    where: Prisma.TransactionWhereUniqueInput,
  ): Promise<Transaction | null> {
    return await this.prisma.transaction.findUnique({ where });
  }

  async update(
    where: Prisma.TransactionWhereUniqueInput,
    data: UpdateTransactionDto,
  ): Promise<CrudResponse<Transaction>> {
    const updatedTransaction = await this.prisma.transaction.update({
      where,
      data,
    });

    return {
      message: 'Transacción actualizada exitosamente',
      data: updatedTransaction,
    };
  }

  async remove(
    where: Prisma.TransactionWhereUniqueInput,
  ): Promise<CrudResponse<Transaction>> {
    const deletedTransaction = await this.prisma.transaction.delete({
      where,
    });
    return {
      message: 'Transacción eliminada exitosamente',
      data: deletedTransaction,
    };
  }
}
