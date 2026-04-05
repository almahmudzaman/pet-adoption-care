import { IsOptional, IsString, IsNumber } from 'class-validator';

export class PetSearchDto {
    @IsOptional()
    @IsString()
    breed?: string;

    @IsOptional()
    @IsNumber()
    ageMin?: number;

    @IsOptional()
    @IsNumber()
    ageMax?: number;

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsNumber()
    page?: number;

    @IsOptional()
    @IsNumber()
    limit?: number;
}