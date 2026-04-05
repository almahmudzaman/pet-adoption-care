import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateApplicationDto {
    @IsNumber()
    petId!: number;

    @IsString()
    message!: string;

    @IsOptional()
    @IsString()
    homeType?: string;

    @IsOptional()
    answers?: any[];
}