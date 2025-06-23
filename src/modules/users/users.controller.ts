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
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaExceptionFilter } from '../../common/filters/prisma-exception.filter';
import { Prisma } from '@prisma/client';
import { ParseObjectPipe } from '../../common/pipes/parse-object.pipe';

@UseFilters(PrismaExceptionFilter)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body(new ValidationPipe({ transform: true })) data: CreateUserDto) {
    return this.usersService.create(data);
  }

  @Get()
  findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('perPage', new ParseIntPipe({ optional: true })) perPage?: number,
    @Query('where', ParseObjectPipe) where?: Prisma.UserWhereUniqueInput,
    @Query('orderBy', ParseObjectPipe)
    orderBy?: Prisma.UserOrderByWithRelationInput,
  ) {
    return this.usersService.findAll(page, perPage, where, orderBy);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.usersService.update({ id }, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove({ id });
  }
}
