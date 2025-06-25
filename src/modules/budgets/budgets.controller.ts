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
import { BudgetsService } from './budgets.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { PrismaExceptionFilter } from '../../common/filters/prisma-exception.filter';
import { ParseObjectPipe } from '../../common/pipes/parse-object.pipe';
import { Prisma } from '@prisma/client';

@UseFilters(PrismaExceptionFilter)
@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Post()
  create(@Body() createBudgetDto: CreateBudgetDto) {
    return this.budgetsService.create(createBudgetDto);
  }

  @Get()
  findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('perPage', new ParseIntPipe({ optional: true })) perPage?: number,
    @Query('where', ParseObjectPipe) where?: Prisma.BudgetWhereUniqueInput,
    @Query('orderBy', ParseObjectPipe)
    orderBy?: Prisma.BudgetOrderByWithRelationInput,
  ) {
    return this.budgetsService.findAll(page, perPage, where, orderBy);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.budgetsService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBudgetDto: UpdateBudgetDto) {
    return this.budgetsService.update({ id }, updateBudgetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.budgetsService.remove({ id });
  }
}
