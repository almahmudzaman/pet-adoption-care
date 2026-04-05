import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseInterceptors,
  UploadedFile,
  Res,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { SellersService } from './sellers.service';
import { RegisterSellerDto } from './dto/register-seller.dto';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetFilterQueryDto } from './dto/pet-filter-query.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
import { PaymentHistoryQueryDto } from './dto/payment-history-query.dto';
import type { Response } from 'express';
 
@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}
 
  @Post('register')
  register(@Body() registerSellerDto: RegisterSellerDto) {
    return this.sellersService.register(registerSellerDto);
  }
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
          cb(null, true);
        } else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 2097152  },
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return file;
  }
 
  @Get('getimage/:name')
  getImages(@Param('name') name: string, @Res() res: Response) {
    res.sendFile(name, { root: './uploads' });
  }
 
  @Post('pets')
  createPet(@Body() createPetDto: CreatePetDto) {
    return this.sellersService.createPet(createPetDto);
  }
 
  @Get('pets')
  getMyPets(@Query() filterQuery: PetFilterQueryDto) {
    return this.sellersService.getMyPets(filterQuery);
  }
 
  @Get('pets/:petId')
  viewPet(@Param('petId', ParseIntPipe) petId: number) {
    return this.sellersService.viewPet(petId);
  }
 
  @Put('pets/:petId')
  updatePet(@Param('petId', ParseIntPipe) petId: number, @Body() updatePetDto: UpdatePetDto) {
    return this.sellersService.updatePet(petId, updatePetDto);
  }
 
  @Patch('pets/:petId/status')
  updatePetStatus(
    @Param('petId', ParseIntPipe) petId: number,
    @Body() body: { status: 'available' | 'adopted' },
  ) {
    return this.sellersService.updatePetStatus(petId, body.status);
  }
 
  @Delete('pets/:petId')
  deletePet(@Param('petId', ParseIntPipe) petId: number) {
    return this.sellersService.deletePet(petId);
  }
 
  @Get('applications')
  viewApplications(@Query() query: { page?: number; limit?: number }) {
    return this.sellersService.viewApplications(query);
  }
 
  @Patch('applications/:applicationId')
  updateApplicationStatus(
    @Param('applicationId', ParseIntPipe) applicationId: number,
    @Body() updateApplicationStatusDto: UpdateApplicationStatusDto,
  ) {
    return this.sellersService.updateApplicationStatus(
      applicationId,
      updateApplicationStatusDto,
    );
  }
 
  @Get('payments')
  viewPayments(@Query() paymentQuery: PaymentHistoryQueryDto) {
    return this.sellersService.viewPayments(paymentQuery);
  }
 
  @Get()
  findAll() {
    return this.sellersService.findAll();
  }
 
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sellersService.findOne(id);
  }
}
 
