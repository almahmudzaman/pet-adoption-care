import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import type { Express } from 'express';
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
  @UseInterceptors(
    FileInterceptor('nidImage', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const folder = './NID';

          
          if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
          }

        
          cb(null, folder);
        },

        filename: (req, file, cb) => {
          const name = String(req.body.name || '').replace(/\s+/g, '_');
          const nid = String(req.body.nidNumber || '');

          cb(null, `${nid}_${name}.pdf`);
        },
      }),

      fileFilter: (req, file, cb) => {
      
        if (file.mimetype !== 'application/pdf') {
          return cb(new BadRequestException('Only PDF file allowed'), false);
        }
        cb(null, true);
      },

      limits: { fileSize: 2 * 1024 * 1024 }, 
    }),
  )
  register(@Body() dto: RegisterVetDto, @UploadedFile() nidImage: Express.Multer.File) {
    return this.vetsService.register(dto, nidImage);
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
  updateConsultationStatus(@Param('id') id: string, @Body() dto: UpdateConsultationStatusDto): object {
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