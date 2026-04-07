import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcryptjs';
import { RegisterSellerDto } from './dto/register-seller.dto';
import { LoginSellerDto } from './dto/login-seller.dto';
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

  constructor(private jwtService: JwtService, private mailerService: MailerService) {}

  async register(registerSellerDto: RegisterSellerDto) {
    // Check if seller already exists
    const existingSeller = this.sellers.find(s => s.email === registerSellerDto.email);
    if (existingSeller) {
      throw new HttpException('Seller with this email already exists', HttpStatus.BAD_REQUEST);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(registerSellerDto.password, 10);

    const newSeller = {
      id: this.sellers.length + 1,
      ...registerSellerDto,
      password: hashedPassword,
      role: 'seller',
      createdAt: new Date(),
    };
    this.sellers.push(newSeller);

    // Send welcome email
    try {
      await this.mailerService.sendMail({
        to: newSeller.email,
        subject: 'Welcome to Pet Adoption Care - Seller Registration',
        template: 'welcome-seller', // You can create a template
        context: {
          name: newSeller.name,
          email: newSeller.email,
        },
      });
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      // Don't throw error, registration is successful
    }

    return { message: 'Seller registered successfully', seller: { ...newSeller, password: undefined } };
  }

  async login(loginSellerDto: LoginSellerDto) {
    const seller = this.sellers.find(s => s.email === loginSellerDto.email);
    if (!seller) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(loginSellerDto.password, seller.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const payload = { id: seller.id, email: seller.email, role: seller.role };
    const token = this.jwtService.sign(payload);
    return { message: 'Login successful', token };
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
      throw new HttpException('Pet not found', HttpStatus.NOT_FOUND);
    }
    return pet;
  }

  updatePet(petId: number, updatePetDto: UpdatePetDto) {
    const pet = this.pets.find((p) => p.id === petId);
    if (!pet) {
      throw new HttpException('Pet not found', HttpStatus.NOT_FOUND);
    }
    Object.assign(pet, updatePetDto);
    return { message: 'Pet updated successfully', pet };
  }

  updatePetStatus(petId: number, status: 'available' | 'adopted') {
    const pet = this.pets.find((p) => p.id === petId);
    if (!pet) {
      throw new HttpException('Pet not found', HttpStatus.NOT_FOUND);
    }
    pet.status = status;
    pet.updatedAt = new Date();
    return { message: `Pet status updated to ${status}`, pet };
  }

  deletePet(petId: number) {
    const index = this.pets.findIndex((p) => p.id === petId);
    if (index === -1) {
      throw new HttpException('Pet not found', HttpStatus.NOT_FOUND);
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
      throw new HttpException('Application not found', HttpStatus.NOT_FOUND);
    }
    application.status = updateApplicationStatusDto.status;
    application.reason = updateApplicationStatusDto.reason;
    application.updatedAt = new Date();

    // Send notification email to seller
    const seller = this.sellers.find(s => s.id === application.sellerId); // Assuming application has sellerId
    if (seller) {
      try {
        await this.mailerService.sendMail({
          to: seller.email,
          subject: 'Application Status Updated',
          html: `
            <h1>Application Status Update</h1>
            <p>Dear ${seller.name},</p>
            <p>The status of application #${applicationId} has been updated to: <strong>${application.status}</strong></p>
            ${application.reason ? `<p>Reason: ${application.reason}</p>` : ''}
            <p>Thank you for using Pet Adoption Care.</p>
          `,
        });
      } catch (error) {
        console.error('Failed to send status update email:', error);
      }
    }

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

