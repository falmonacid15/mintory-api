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
import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { PrismaExceptionFilter } from '../../common/filters/prisma-exception.filter';
import { ParseObjectPipe } from '../../common/pipes/parse-object.pipe';
import { Prisma } from '@prisma/client';

@UseFilters(PrismaExceptionFilter)
@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post()
  create(@Body() data: CreateGoalDto) {
    return this.goalsService.create(data);
  }

  @Get()
  findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('perPage', new ParseIntPipe({ optional: true })) perPage?: number,
    @Query('where', ParseObjectPipe) where?: Prisma.GoalWhereUniqueInput,
    @Query('orderBy', ParseObjectPipe)
    orderBy?: Prisma.GoalOrderByWithRelationInput,
  ) {
    return this.goalsService.findAll(page, perPage, where, orderBy);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goalsService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateGoalDto) {
    return this.goalsService.update({ id }, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goalsService.remove({ id });
  }
}
