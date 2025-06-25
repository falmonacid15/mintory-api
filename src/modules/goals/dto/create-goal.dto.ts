import {
  IsString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateGoalDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumberString()
  @IsNotEmpty()
  target: string;

  @IsOptional()
  @IsNumberString()
  current?: string;

  @IsOptional()
  @IsDateString()
  deadline?: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
