import { Month } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export class CreateBudgetDto {
  @IsEnum(Month)
  @Transform(({ value }) => value.toUpperCase())
  @IsNotEmpty()
  month: Month;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsNumberString()
  @IsNotEmpty()
  limit: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
