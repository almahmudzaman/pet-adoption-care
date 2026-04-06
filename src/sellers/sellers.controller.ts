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
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { SellersService } from './sellers.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RegisterSellerDto } from './dto/register-seller.dto';
import { LoginSellerDto } from './dto/login-seller.dto';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetFilterQueryDto } from './dto/pet-filter-query.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
import { PaymentHistoryQueryDto } from './dto/payment-history-query.dto';
import { Response } from 'express';
 
@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}
 
  @Post('register')
  register(@Body() registerSellerDto: RegisterSellerDto) {
    return this.sellersService.register(registerSellerDto);
  }

  @Post('login')
  login(@Body() loginSellerDto: LoginSellerDto) {
    return this.sellersService.login(loginSellerDto);
  }
  @Post('upload')
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  createPet(@Body() createPetDto: CreatePetDto) {
    return this.sellersService.createPet(createPetDto);
  }
 
  @Get('pets')
  @UseGuards(JwtAuthGuard)
  getMyPets(@Query() filterQuery: PetFilterQueryDto) {
    return this.sellersService.getMyPets(filterQuery);
  }
 
  @Get('pets/:petId')
  @UseGuards(JwtAuthGuard)
  viewPet(@Param('petId', ParseIntPipe) petId: number) {
    return this.sellersService.viewPet(petId);
  }
 
  @Put('pets/:petId')
  @UseGuards(JwtAuthGuard)
  updatePet(@Param('petId', ParseIntPipe) petId: number, @Body() updatePetDto: UpdatePetDto) {
    return this.sellersService.updatePet(petId, updatePetDto);
  }
 
  @Patch('pets/:petId/status')
  @UseGuards(JwtAuthGuard)
  updatePetStatus(
    @Param('petId', ParseIntPipe) petId: number,
    @Body() body: { status: 'available' | 'adopted' },
  ) {
    return this.sellersService.updatePetStatus(petId, body.status);
  }
 
  @Delete('pets/:petId')
  @UseGuards(JwtAuthGuard)
  deletePet(@Param('petId', ParseIntPipe) petId: number) {
    return this.sellersService.deletePet(petId);
  }
 
  @Get('applications')
  @UseGuards(JwtAuthGuard)
  viewApplications(@Query() query: { page?: number; limit?: number }) {
    return this.sellersService.viewApplications(query);
  }
 
  @Patch('applications/:applicationId')
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  viewPayments(@Query() paymentQuery: PaymentHistoryQueryDto) {
    return this.sellersService.viewPayments(paymentQuery);
  }
 
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.sellersService.findAll();
  }
 
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sellersService.findOne(id);
  }

  // ============ RELATIONSHIP ROUTES ============

  // Seller → Pets (One-to-Many) CRUD Routes
  @Post(':sellerId/pets')
  @UseGuards(JwtAuthGuard)
  createPetForSeller(
    @Param('sellerId', ParseIntPipe) sellerId: number,
    @Body() createPetDto: CreatePetDto,
  ) {
    return this.sellersService.createPetForSeller(sellerId, createPetDto);
  }

  @Get(':sellerId/pets')
  @UseGuards(JwtAuthGuard)
  getSellerPets(@Param('sellerId', ParseIntPipe) sellerId: number) {
    return this.sellersService.getSellerPets(sellerId);
  }

  @Delete(':sellerId/pets/:petId')
  @UseGuards(JwtAuthGuard)
  deleteSellerPet(
    @Param('sellerId', ParseIntPipe) sellerId: number,
    @Param('petId', ParseIntPipe) petId: number,
  ) {
    return this.sellersService.deleteSellerPet(sellerId, petId);
  }

  // Seller → Applications (One-to-Many) CRUD Routes
  @Get(':sellerId/applications')
  @UseGuards(JwtAuthGuard)
  getSellerApplications(@Param('sellerId', ParseIntPipe) sellerId: number) {
    return this.sellersService.getSellerApplications(sellerId);
  }

  @Delete(':sellerId/applications/:appId')
  @UseGuards(JwtAuthGuard)
  deleteSellerApplication(
    @Param('sellerId', ParseIntPipe) sellerId: number,
    @Param('appId', ParseIntPipe) appId: number,
  ) {
    return this.sellersService.deleteSellerApplication(sellerId, appId);
  }

  // Pet → Applications (One-to-Many) CRUD Routes
  @Post(':sellerId/pets/:petId/applications')
  @UseGuards(JwtAuthGuard)
  createApplicationForPet(
    @Param('sellerId', ParseIntPipe) sellerId: number,
    @Param('petId', ParseIntPipe) petId: number,
    @Body() body: any,
  ) {
    return this.sellersService.createApplicationForPet(sellerId, petId, body);
  }
}