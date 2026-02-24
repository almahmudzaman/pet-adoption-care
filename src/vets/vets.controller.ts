
import { Controller, Get, Post, Put, Patch, Delete, Body, Param } from '@nestjs/common';
import { VetsService } from './vets.service';

import { RegisterVetDto } from './dto/register-vet.dto';
import { UpdateVetProfileDto } from './dto/update-vet-profile.dto';
import { PatchVetProfileDto } from './dto/patch-vet-profile.dto';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateConsultationStatusDto } from './dto/update-consultation-status.dto';
import { CreateArticleDto } from './dto/create-article.dto';

@Controller('vets')
export class VetsController {
  constructor(private readonly vetsService: VetsService) {}


  @Post('register')
  register(@Body() dto: RegisterVetDto): object {
    return this.vetsService.register(dto);
  }


  @Get('profile')
  getProfile(): object {
    return this.vetsService.getProfile();
  }


  @Put('profile')
  updateProfile(@Body() dto: UpdateVetProfileDto): object {
    return this.vetsService.updateProfile(dto);
  }


  @Patch('profile')
  patchProfile(@Body() dto: PatchVetProfileDto): object {
    return this.vetsService.patchProfile(dto);
  }


  @Delete('profile')
  deactivateAccount(): object {
    return this.vetsService.deactivateAccount();
  }


  @Post('availability')
  createAvailability(@Body() dto: CreateAvailabilityDto): object {
    return this.vetsService.createAvailability(dto);
  }


  @Get('consultations')
  getConsultations(): object {
    return this.vetsService.getConsultations();
  }

  @Patch('consultations/:id')
  updateConsultationStatus(
    @Param('id') id: string,
    @Body() dto: UpdateConsultationStatusDto,
  ): object {
    return this.vetsService.updateConsultationStatus(id, dto);
  }


  @Post('articles')
  createArticle(@Body() dto: CreateArticleDto): object {
    return this.vetsService.createArticle(dto);
  }


  @Delete('articles/:articleId')
  deleteArticle(@Param('articleId') articleId: string): object {
    return this.vetsService.deleteArticle(articleId);
  }
}