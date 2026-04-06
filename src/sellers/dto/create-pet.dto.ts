import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreatePetDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  age: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  species: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  breed: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  gender: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description: string;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  adoptionFee: number;
}
