import { IsOptional, IsString } from 'class-validator';

export class UpdateApplicationDto {
    @IsOptional()
    @IsString()
    message?: string;

    @IsOptional()
    @IsString()
    homeType?: string;

    @IsOptional()
    answers?: any[];
}