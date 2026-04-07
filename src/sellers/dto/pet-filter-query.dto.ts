import { IsString, IsNumber, IsOptional, IsIn, Min } from 'class-validator';

export class PetFilterQueryDto {
  @IsOptional()
  @IsString({ message: 'Species must be a string' })
  species?: string;

  @IsOptional()
  @IsString({ message: 'Breed must be a string' })
  breed?: string;

  @IsOptional()
  @IsString({ message: 'Status must be a string' })
  @IsIn(['available', 'adopted'], { message: 'Status must be either available or adopted' })
  status?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Min age must be a number' })
  @Min(0, { message: 'Min age cannot be negative' })
  minAge?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Max age must be a number' })
  @Min(0, { message: 'Max age cannot be negative' })
  maxAge?: number;

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
