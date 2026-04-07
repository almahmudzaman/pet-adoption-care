import { IsString, IsNumber, IsOptional, IsIn, Min, IsDateString } from 'class-validator';

export class PaymentHistoryQueryDto {
  @IsOptional()
  @IsIn(['pending', 'completed', 'failed'], { message: 'Status must be pending, completed, or failed' })
  status?: 'pending' | 'completed' | 'failed';

  @IsOptional()
  @IsDateString({}, { message: 'Start date must be a valid date' })
  startDate?: string;

  @IsOptional()
  @IsDateString({}, { message: 'End date must be a valid date' })
  endDate?: string;

  @IsOptional()
  @IsString({ message: 'From date must be a string' })
  @IsDateString({}, { message: 'From date must be a valid date string' })
  fromDate?: string;

  @IsOptional()
  @IsString({ message: 'To date must be a string' })
  @IsDateString({}, { message: 'To date must be a valid date string' })
  toDate?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Page must be a number' })
  @Min(1, { message: 'Page must be at least 1' })
  page?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Limit must be a number' })
  @Min(1, { message: 'Limit must be at least 1' })
  limit?: number;

  @IsOptional()
  @IsString({ message: 'Sort by must be a string' })
  sortBy?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'], { message: 'Order must be either ASC or DESC' })
  order?: 'ASC' | 'DESC';
}
