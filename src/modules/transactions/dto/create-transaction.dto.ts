import { TransactionType } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTransactionDto {
  @IsEnum(TransactionType)
  @Transform(({ value }) => value.toUpperCase())
  @IsNotEmpty()
  type: TransactionType;

  @IsNumberString()
  @IsNotEmpty()
  amount: string;

  @IsString()
  @IsOptional()
  note?: string;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
