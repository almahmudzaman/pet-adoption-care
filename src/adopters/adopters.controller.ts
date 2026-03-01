import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AdoptersService } from './adopters.service';

import { RegisterAdopterDto } from './dto/register-adopter.dto';
import { PetSearchDto } from './dto/pet-search.dto';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApplicationStatusQueryDto } from './dto/application-status-query.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { BookConsultationDto  } from './dto/book-consultation.dto';
@Controller('adopters')
export class AdoptersController {

    constructor(private readonly adoptersService: AdoptersService) {}

    @Post('register')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true })) 
    register(@Body() dto: RegisterAdopterDto): object {
        return this.adoptersService.register(dto);
    }

    @Get('pets')
    findPets(@Query() dto: PetSearchDto): object {
        return this.adoptersService.findPets(dto);
    }

    @Get('pets/:petId')
    findOnePet(@Param('petId') petId: string): object {
        return this.adoptersService.findOnePet(petId);
    }

    @Post('applications')
    createApplication(@Body() dto: CreateApplicationDto): object {
        return this.adoptersService.createApplication(dto);
    }

    @Get('applications')
    getMyApplications(@Query() dto: ApplicationStatusQueryDto): object {
        return this.adoptersService.getMyApplications(dto);
    }

    @Put('profile')
    updateProfile(@Body() dto: UpdateProfileDto): object {
        return this.adoptersService.updateProfile(dto);
    }

    @Patch('applications/:applicationId')
    updateApplication(
        @Param('applicationId') applicationId: string,
        @Body() dto: UpdateApplicationDto
    ): object {
        return this.adoptersService.updateApplication(applicationId, dto);
    }

    @Delete('applications/:applicationId')
    cancelApplication(@Param('applicationId') applicationId: string): object {
        return this.adoptersService.cancelApplication(applicationId);
    }

    @Post('consultations')
    bookConsultation(@Body() dto: BookConsultationDto): object {
        return this.adoptersService.bookConsultation(dto);
    }

    @Delete('favorites/:petId')
    removeFavorite(@Param('petId') petId: string): object {
        return this.adoptersService.removeFavorite(petId);
    }
}