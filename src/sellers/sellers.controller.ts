import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { RegisterSellerDto } from './dto/register-seller.dto';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetFilterQueryDto } from './dto/pet-filter-query.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
import { PaymentHistoryQueryDto } from './dto/payment-history-query.dto';

@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

 
  @Post('register')
  register(@Body() registerSellerDto: RegisterSellerDto) {
    return this.sellersService.register(registerSellerDto);
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
  viewPet(@Param('petId') petId: string) {
    return this.sellersService.viewPet(+petId);
  }

  @Put('pets/:petId')
  updatePet(@Param('petId') petId: string, @Body() updatePetDto: UpdatePetDto) {
    return this.sellersService.updatePet(+petId, updatePetDto);
  }

  @Patch('pets/:petId/status')
  updatePetStatus(
    @Param('petId') petId: string,
    @Body() body: { status: 'available' | 'adopted' },
  ) {
    return this.sellersService.updatePetStatus(+petId, body.status);
  }

  @Delete('pets/:petId')
  deletePet(@Param('petId') petId: string) {
    return this.sellersService.deletePet(+petId);
  }

  @Get('applications')
  viewApplications(@Query() query: { page?: number; limit?: number }) {
    return this.sellersService.viewApplications(query);
  }

  @Patch('applications/:applicationId')
  updateApplicationStatus(
    @Param('applicationId') applicationId: string,
    @Body() updateApplicationStatusDto: UpdateApplicationStatusDto,
  ) {
    return this.sellersService.updateApplicationStatus(+applicationId, updateApplicationStatusDto);
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
  findOne(@Param('id') id: string) {
    return this.sellersService.findOne(+id);
  }
}
