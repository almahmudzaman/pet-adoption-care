import {
  Controller, Get, Post, Put, Patch, Delete,
  Body, Param, Query, UsePipes, ValidationPipe,
  UseGuards, Req
} from '@nestjs/common';

import { AdoptersService } from './adopters.service';
import { JwtAuthGuard } from './jwt-auth.guard';

// DTOs
import { RegisterAdopterDto } from './dto/register-adopter.dto';
import { PetSearchDto } from './dto/pet-search.dto';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApplicationStatusQueryDto } from './dto/application-status-query.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { BookConsultationDto } from './dto/book-consultation.dto';

@Controller('adopters')
export class AdoptersController {
  constructor(private readonly adoptersService: AdoptersService) {}

  // 0. Login
  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  login(@Body() dto: any) {
    return this.adoptersService.login(dto);
  }

  // 1. Register adopter
  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  register(@Body() dto: RegisterAdopterDto) {
    return this.adoptersService.register(dto);
  }

  // 2. Search pets
  @UseGuards(JwtAuthGuard)
  @Get('pets')
  findPets(@Query() dto: PetSearchDto) {
    return this.adoptersService.findPets(dto);
  }

  // 3. Get single pet
  @UseGuards(JwtAuthGuard)
  @Get('pets/:petId')
  findOnePet(@Param('petId') petId: string) {
    return this.adoptersService.findOnePet(petId);
  }

  // 4. Create adoption application
  @UseGuards(JwtAuthGuard)
  @Post('applications')
  createApplication(@Body() dto: CreateApplicationDto, @Req() req) {
    const adopterId = req.user.id; 
    return this.adoptersService.createApplication(dto, adopterId);
  }

  // 5. Get my applications
  @UseGuards(JwtAuthGuard)
  @Get('applications')
  getMyApplications(@Query() dto: ApplicationStatusQueryDto, @Req() req) {
    const adopterId = req.user.id;
    return this.adoptersService.getMyApplications(dto, adopterId);
  }

  // 6. Update profile
  @UseGuards(JwtAuthGuard)
  @Put('profile')
  updateProfile(@Body() dto: UpdateProfileDto, @Req() req) {
    return this.adoptersService.updateProfile(dto, req.user.id);
  }

  // 7. Update application
  @UseGuards(JwtAuthGuard)
  @Patch('applications/:applicationId')
  updateApplication(
    @Param('applicationId') applicationId: string,
    @Body() dto: UpdateApplicationDto,
    @Req() req
  ) {
    return this.adoptersService.updateApplication(applicationId, dto, req.user.id);
  }

  // 8. Cancel application
  @UseGuards(JwtAuthGuard)
  @Delete('applications/:applicationId')
  cancelApplication(@Param('applicationId') applicationId: string, @Req() req) {
    return this.adoptersService.cancelApplication(applicationId, req.user.id);
  }

  // 9. Book consultation
  @UseGuards(JwtAuthGuard)
  @Post('consultations')
  bookConsultation(@Body() dto: BookConsultationDto) {
    return this.adoptersService.bookConsultation(dto);
  }

  // 10. Add to favorites
  @UseGuards(JwtAuthGuard)
  @Post('favorites')
  addToFavorites(@Body() dto: any, @Req() req) {
    return this.adoptersService.addToFavorites(dto, req.user.id);
  }

  // 11. Remove favorite
  @UseGuards(JwtAuthGuard)
  @Delete('favorites/:petId')
  removeFavorite(@Param('petId') petId: string, @Req() req) {
    return this.adoptersService.removeFavorite(petId, req.user.id);
  }

  // 12. Get my favorites
  @UseGuards(JwtAuthGuard)
  @Get('favorites')
  getMyFavorites(@Req() req) {
    return this.adoptersService.getMyFavorites(req.user.id);
  }
}