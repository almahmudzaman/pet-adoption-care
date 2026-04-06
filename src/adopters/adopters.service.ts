import {
  Injectable, HttpException, HttpStatus,
  NotFoundException, BadRequestException
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { User } from '../common/entities/user.entity';
import { Pet } from '../common/entities/pet.entity';
import { AdoptionApplication } from '../common/entities/adoption-application.entity';
import { Favorite } from '../common/entities/favorite.entity';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AdoptersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Pet) private petRepo: Repository<Pet>,
    @InjectRepository(AdoptionApplication) private appRepo: Repository<AdoptionApplication>,
    @InjectRepository(Favorite) private favoriteRepo: Repository<Favorite>,
    private jwtService: JwtService,
    
    private mailerService: MailerService,

  ) {}

  // 0. Login
  async login(dto: any) {
    const user = await this.userRepo.findOneBy({ email: dto.email });

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
    }

    const payload = { id: user.userId, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      success: true,
      message: 'Login successful',
      data: { token }
    };
  }

  // 1. Register
  async register(dto: any) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.userRepo.create({
      ...dto,
      password: hashedPassword,
      role: 'ADOPTER'
    });

    return {
      success: true,
      message: 'Registered',
      data: await this.userRepo.save(user)
    };
  }

  // 2. Search pets
  async findPets(dto: any) {
    const pets = await this.petRepo.find();
    return { success: true, data: pets };
  }

  // 3. Single pet
  async findOnePet(petId: string) {
    const pet = await this.petRepo.findOneBy({ petId: parseInt(petId) });
    if (!pet) throw new NotFoundException('Pet not found');

    return { success: true, data: pet };
  }

  // 4. Create application
  async createApplication(dto: any, adopterId: number) {
    const adopter = await this.userRepo.findOneBy({ userId: adopterId });
    const pet = await this.petRepo.findOneBy({ petId: dto.petId });

    if (!adopter) throw new NotFoundException('Adopter not found');
    if (!pet) throw new NotFoundException('Pet not found');

    // prevent duplicate
    const exists = await this.appRepo.findOne({
      where: { adopter: { userId: adopterId }, pet: { petId: dto.petId } }
    });

    if (exists) throw new BadRequestException('Already applied');

    const app = this.appRepo.create({
      message: dto.message,
      adopter,
      pet,
      status: 'PENDING'
    });

    return {
      success: true,
      data: await this.appRepo.save(app)
    };
  }

  // 5. Get my applications
  async getMyApplications(dto: any, adopterId: number) {
    const apps = await this.appRepo.find({
      where: {
        adopter: { userId: adopterId },
        status: dto.status || undefined
      },
      relations: ['pet']
    });

    return { success: true, data: apps };
  }

  // 6. Update profile
async updateProfile(dto: any, userId: number) {
  // a. Get existing user
  const user = await this.userRepo.findOneBy({ userId });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  // b. Detect changes
  const changes: string[] = [];

  if (dto.name && dto.name !== user.name) {
    changes.push(`Name: "${user.name}" → "${dto.name}"`);
  }

  if (dto.phone && dto.phone !== user.phone) {
    changes.push(`Phone: "${user.phone}" → "${dto.phone}"`);
  }

  if (dto.address && dto.address !== user.address) {
    changes.push(`Address updated`);
  }

  // c. Update database
  await this.userRepo.update(userId, {
    name: dto.name ?? user.name,
    phone: dto.phone ?? user.phone,
    address: dto.address ?? user.address
  });

  // d. Send email ONLY if changes exist
  if (changes.length > 0) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Profile Updated',
      text: `Hello ${user.name},

The following changes were made to your profile:

${changes.join('\n')}

If this wasn't you, please contact support.`
    });
  }

  return {
    success: true,
    message: 'Profile updated successfully'
  };
}
  // 7. Update application
  async updateApplication(applicationId: string, dto: any, userId: number) {
    const app = await this.appRepo.findOne({
      where: { id: parseInt(applicationId) },
      relations: ['adopter']
    });

    if (!app || app.adopter.userId !== userId) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    await this.appRepo.update(applicationId, dto);

    return { success: true, message: 'Updated' };
  }

  // 8. Cancel application
  async cancelApplication(applicationId: string, userId: number) {
    const app = await this.appRepo.findOne({
      where: { id: parseInt(applicationId) },
      relations: ['adopter']
    });

    if (!app || app.adopter.userId !== userId) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    await this.appRepo.delete(applicationId);

    return { success: true, message: 'Deleted' };
  }

  // 9. Add favorite
  async addToFavorites(dto: any, userId: number) {
    const user = await this.userRepo.findOneBy({ userId });
    const pet = await this.petRepo.findOneBy({ petId: dto.petId });

    if (!user) throw new NotFoundException('User not found');
    if (!pet) throw new NotFoundException('Pet not found');

    const favorite = this.favoriteRepo.create({ adopter: user, pet });
    return { success: true, data: await this.favoriteRepo.save(favorite) };
  }

  // 10. Remove favorite
  async removeFavorite(petId: string, userId: number) {
    await this.favoriteRepo.delete({
      adopter: { userId },
      pet: { petId: parseInt(petId) }
    });

    return { success: true, message: 'Removed' };
  }

  // 11. Get favorites
  async getMyFavorites(userId: number) {
    const favorites = await this.favoriteRepo.find({
      where: { adopter: { userId } },
      relations: ['pet']
    });

    return { success: true, data: favorites };
  }

  // 12. Consultation (dummy)
  async bookConsultation(dto: any) {
    return { success: true, data: dto };
  }
}