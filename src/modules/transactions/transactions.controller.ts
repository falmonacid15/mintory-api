import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaExceptionFilter } from '../../common/filters/prisma-exception.filter';
import { ParseObjectPipe } from '../../common/pipes/parse-object.pipe';
import { Prisma } from '@prisma/client';

@UseFilters(PrismaExceptionFilter)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() data: CreateTransactionDto) {
    return this.transactionsService.create(data);
  }

  @Get()
  findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('perPage', new ParseIntPipe({ optional: true })) perPage?: number,
    @Query('where', ParseObjectPipe) where?: Prisma.TransactionWhereUniqueInput,
    @Query('orderBy', ParseObjectPipe)
    orderBy?: Prisma.TransactionOrderByWithRelationInput,
  ) {
    return this.transactionsService.findAll(page, perPage, where, orderBy);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateTransactionDto) {
    return this.transactionsService.update({ id }, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove({ id });
  }
}
