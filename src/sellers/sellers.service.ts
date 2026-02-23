import { Injectable } from '@nestjs/common';
import { RegisterSellerDto } from './dto/register-seller.dto';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetFilterQueryDto } from './dto/pet-filter-query.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
import { PaymentHistoryQueryDto } from './dto/payment-history-query.dto';

@Injectable()
export class SellersService {
  private sellers: any[] = [];
  private pets: any[] = [];
  private applications: any[] = [];
  private payments: any[] = [];

  constructor() {}

  register(registerSellerDto: RegisterSellerDto) {
    const newSeller = {
      id: this.sellers.length + 1,
      ...registerSellerDto,
      createdAt: new Date(),
    };
    this.sellers.push(newSeller);
    return { message: 'Seller registered successfully', seller: newSeller };
  }

  createPet(createPetDto: CreatePetDto) {
    const newPet = {
      id: this.pets.length + 1,
      ...createPetDto,
      status: 'available',
      createdAt: new Date(),
    };
    this.pets.push(newPet);
    return { message: 'Pet listing created successfully', pet: newPet };
  }

  // 3. Get my pets
  getMyPets(filterQuery: PetFilterQueryDto) {
    let result = [...this.pets];

    if (filterQuery.species) {
      result = result.filter((p) => p.species === filterQuery.species);
    }
    if (filterQuery.breed) {
      result = result.filter((p) => p.breed === filterQuery.breed);
    }
    if (filterQuery.minAge !== undefined) {
      result = result.filter((p) => p.age >= filterQuery.minAge!);
    }
    if (filterQuery.maxAge !== undefined) {
      result = result.filter((p) => p.age <= filterQuery.maxAge!);
    }

    const page = filterQuery.page || 1;
    const limit = filterQuery.limit || 10;
    const skip = (page - 1) * limit;

    return {
      total: result.length,
      page,
      limit,
      pets: result.slice(skip, skip + limit),
    };
  }

  viewPet(petId: number) {
    const pet = this.pets.find((p) => p.id === petId);
    if (!pet) {
      return { message: 'Pet not found', statusCode: 404 };
    }
    return pet;
  }

  updatePet(petId: number, updatePetDto: UpdatePetDto) {
    const pet = this.pets.find((p) => p.id === petId);
    if (!pet) {
      return { message: 'Pet not found', statusCode: 404 };
    }
    Object.assign(pet, updatePetDto);
    return { message: 'Pet updated successfully', pet };
  }

  updatePetStatus(petId: number, status: 'available' | 'adopted') {
    const pet = this.pets.find((p) => p.id === petId);
    if (!pet) {
      return { message: 'Pet not found', statusCode: 404 };
    }
    pet.status = status;
    pet.updatedAt = new Date();
    return { message: `Pet status updated to ${status}`, pet };
  }

  deletePet(petId: number) {
    const index = this.pets.findIndex((p) => p.id === petId);
    if (index === -1) {
      return { message: 'Pet not found', statusCode: 404 };
    }
    this.pets.splice(index, 1);
    return { message: 'Pet deleted successfully' };
  }

  viewApplications(query: { page?: number; limit?: number }) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    return {
      total: this.applications.length,
      page,
      limit,
      applications: this.applications.slice(skip, skip + limit),
    };
  }

  updateApplicationStatus(
    applicationId: number,
    updateApplicationStatusDto: UpdateApplicationStatusDto,
  ) {
    const application = this.applications.find((a) => a.id === applicationId);
    if (!application) {
      return { message: 'Application not found', statusCode: 404 };
    }
    application.status = updateApplicationStatusDto.status;
    application.reason = updateApplicationStatusDto.reason;
    application.updatedAt = new Date();
    return { message: 'Application status updated', application };
  }

  viewPayments(paymentQuery: PaymentHistoryQueryDto) {
    let result = [...this.payments];

    if (paymentQuery.status) {
      result = result.filter((p) => p.status === paymentQuery.status);
    }
    if (paymentQuery.startDate) {
      result = result.filter((p) => new Date(p.date) >= new Date(paymentQuery.startDate!));
    }
    if (paymentQuery.endDate) {
      result = result.filter((p) => new Date(p.date) <= new Date(paymentQuery.endDate!));
    }

    const page = paymentQuery.page || 1;
    const limit = paymentQuery.limit || 10;
    const skip = (page - 1) * limit;

    return {
      total: result.length,
      page,
      limit,
      payments: result.slice(skip, skip + limit),
    };
  }

  findAll() {
    return `This action returns all sellers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seller`;
  }
}

