
import { Injectable } from '@nestjs/common';

import { RegisterVetDto } from './dto/register-vet.dto';
import { UpdateVetProfileDto } from './dto/update-vet-profile.dto';
import { PatchVetProfileDto } from './dto/patch-vet-profile.dto';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateConsultationStatusDto } from './dto/update-consultation-status.dto';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class VetsService {
  register(dto: RegisterVetDto): object {
    return {
      message: 'Vet registered successfully',
      data: { id: 5001, name: dto.name, email: dto.email, clinicName: dto.clinicName },
    };
  }

  getProfile(): object {
    return {
      message: 'Vet profile',
      data: {
        id: 5001,
        name: 'Dr. Sample Vet',
        email: 'vet@example.com',
        clinicName: 'Sample Animal Care',
        phone: '01XXXXXXXXX',
        specialization: 'General',
      },
    };
  }

  updateProfile(dto: UpdateVetProfileDto): object {
    return {
      message: 'Profile fully updated',
      data: dto,
    };
  }

  patchProfile(dto: PatchVetProfileDto): object {
    return {
      message: 'Profile partially updated',
      data: dto,
    };
  }

  deactivateAccount(): object {
    return {
      message: 'Account deactivated',
      data: { deactivated: true },
    };
  }

  createAvailability(dto: CreateAvailabilityDto): object {
    return {
      message: 'Availability slot created',
      data: {
        id: 7001,
        date: dto.date,
        startTime: dto.startTime,
        endTime: dto.endTime,
        isBooked: false,
      },
    };
  }

  getConsultations(): object {
    return {
      message: 'Consultation bookings',
      data: {
        consultations: [
          {
            id: 9001,
            adopterId: 1001,
            petId: 300,
            scheduledAt: '2026-02-28T10:00:00Z',
            status: 'PENDING',
          },
        ],
        total: 1,
      },
    };
  }

  updateConsultationStatus(id: string, dto: UpdateConsultationStatusDto): object {
    return {
      message: 'Consultation status updated',
      data: { id, status: dto.status },
    };
  }

  createArticle(dto: CreateArticleDto): object {
    return {
      message: 'Article created',
      data: {
        id: 8001,
        title: dto.title,
        content: dto.content,
        tags: dto.tags || [],
        createdAt: new Date().toISOString(),
      },
    };
  }

  deleteArticle(articleId: string): object {
    return {
      message: 'Article deleted',
      data: { articleId },
    };
  }
}