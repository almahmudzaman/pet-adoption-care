import { Injectable } from '@nestjs/common';

import { RegisterAdopterDto } from './dto/register-adopter.dto';
import { PetSearchDto } from './dto/pet-search.dto';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApplicationStatusQueryDto } from './dto/application-status-query.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { BookConsultationDto  } from './dto/book-consultation.dto';
@Injectable()
export class AdoptersService {

    register(dto: RegisterAdopterDto): object {
        return {
            message: 'Adopter registered successfully',
            data: { id: 1001, name: dto.name, email: dto.email }
        };
    }

    findPets(dto: PetSearchDto): object {
        return {
            message: 'Pets list',
            data: { pets: [], total: 25, page: dto.page || 1 }
        };
    }

    findOnePet(petId: string): object {
        return {
            message: 'Pet details',
            data: { id: petId, name: 'Buddy', breed: 'Labrador' }
        };
    }

    createApplication(dto: CreateApplicationDto): object {
        return {
            message: 'Application created',
            data: { id: 2001, petId: dto.petId, status: 'PENDING' }
        };
    }

    getMyApplications(dto: ApplicationStatusQueryDto): object {
        return {
            message: 'Your applications',
            data: { applications: [], total: 5 }
        };
    }

    updateProfile(dto: UpdateProfileDto): object {
        return {
            message: 'Profile updated',
            data: dto
        };
    }

    updateApplication(applicationId: string, dto: UpdateApplicationDto): object {
        return {
            message: 'Application updated',
            data: { id: applicationId, ...dto }
        };
    }

    cancelApplication(applicationId: string): object {
        return {

            message: 'Application cancelled',
            data: { id: applicationId }
        };
    }

    bookConsultation(dto: BookConsultationDto): object {
        return {

            message: 'Consultation booked',
            data: { id: 3001, vetId: dto.vetId }
        };
    }

    removeFavorite(petId: string): object {
        return {
            message: 'Removed from favorites',
            data: { petId }
        };
    }
}