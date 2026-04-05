import { IsNumber, IsOptional, IsString } from 'class-validator';

export class BookConsultationDto {
    @IsNumber()
    vetId!: number;

    @IsNumber()
    slotId!: number;

    @IsOptional()
    @IsString()
    notes?: string;

    @IsOptional()
    @IsNumber()
    petId?: number;

    @IsString()
    serviceType!: string;
}
