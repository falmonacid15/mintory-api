import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma.service';
import { hashPassword } from '../../utils/password';
import { CrudResponse } from 'src/types/responses/crud.response';
import { Prisma, User } from '@prisma/client';
import { PaginatedResponse } from '../../types/responses/paginated.response';
import { pagination } from 'prisma-extension-pagination';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<CrudResponse<User>> {
    data.password = await hashPassword(data.password);

    const newUser = await this.prisma.user.create({
      data,
    });

    return {
      message: 'Usuario creado exitosamente',
      data: newUser,
    };
  }

  async findAll(
    page?: number,
    perPage?: number,
    where?: Prisma.UserWhereUniqueInput,
    orderBy?: Prisma.UserOrderByWithRelationInput,
  ): Promise<PaginatedResponse<User>> {
    page = page || 1;
    perPage = perPage || 10;

    const skip = (page - 1) * perPage;
    const take = perPage;

    const [data, totalCount] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        orderBy,
        skip,
        take,
      }),

      this.prisma.user.count({
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

  async findOne(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where,
    });
  }

  async update(
    where: Prisma.UserWhereUniqueInput,
    data: UpdateUserDto,
  ): Promise<CrudResponse<User>> {
    data.password && (data.password = await hashPassword(data.password));

    const updatedUser = await this.prisma.user.update({
      where,
      data,
    });

    return {
      message: 'Usuario actualizado exitosamente',
      data: updatedUser,
    };
  }

  async remove(
    where: Prisma.UserWhereUniqueInput,
  ): Promise<CrudResponse<User>> {
    const deletedUser = await this.prisma.user.delete({
      where,
    });

    return {
      message: 'Usuario eliminado exitosamente',
      data: deletedUser,
    };
  }
}
