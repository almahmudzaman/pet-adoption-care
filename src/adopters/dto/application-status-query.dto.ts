import { IsOptional, IsString, IsNumber } from 'class-validator';

export class ApplicationStatusQueryDto {
    @IsOptional()
    @IsString()
    status?: string;

    @IsOptional()
    @IsNumber()
    page?: number;

    @IsOptional()
    @IsNumber()
    limit?: number;
}