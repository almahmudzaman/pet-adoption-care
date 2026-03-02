import { Injectable } from '@nestjs/common';
import { UpdateUserDto, UpdateUserStatusDto, UserFilterQueryDto, PetFilterQueryDto, PaymentFilterQueryDto, AnalyticsQueryDto, UpdateUserProfileDto } from './admin.dto';

@Injectable()
export class AdminService {
  // Route 1: Admin Login
  adminLogin(email: string, password: string) {
    const validAdmins = [
      { email: 'admin@example.com', password: 'admin123' },
      { email: 'admin@pams.com', password: 'admin123' },
    ];
    const admin = validAdmins.find((a) => a.email === email && a.password === password);
    return admin ? { ok: true, message: 'Login successful' } : { ok: false, message: 'Invalid credentials' };
  }

  // Route 2: Get All Users
  getAllUsers(query: UserFilterQueryDto) {
    return { message: 'All users fetched', data: [] };
  }

  // Route 3: Get Single User
  getUser(userId: string) {
    return { message: `User ${userId} fetched`, data: null };
  }

  // Route 4: Full Update User
  updateUser(userId: string, updateUserDto: UpdateUserDto) {
    return { message: `User ${userId} updated`, data: updateUserDto };
  }

  // Route 5: Update User Status
  updateUserStatus(userId: string, updateUserStatusDto: UpdateUserStatusDto) {
    return { message: `User ${userId} status updated`, data: updateUserStatusDto };
  }

  // Route 6: Delete User
  deleteUser(userId: string) {
    return { message: `User ${userId} deleted`, ok: true };
  }

  // Route 6.1: Update User Profile with Social Media Links
  updateUserProfile(userId: string, dto: UpdateUserProfileDto) {
    return { message: `User ${userId} profile updated`, data: dto };
  }

  // Route 7: Get Pets
  getPets(query: PetFilterQueryDto) {
    return { message: 'All pets fetched', data: [] };
  }

  // Route 8: Delete Pet
  deletePet(petId: string) {
    return { message: `Pet ${petId} deleted`, ok: true };
  }

  // Route 9: Get Payments
  getPayments(query: PaymentFilterQueryDto) {
    return { message: 'All payments fetched', data: [] };
  }

  // Route 10: Get Dashboard Analytics
  getDashboardAnalytics(query: AnalyticsQueryDto) {
    return { message: 'Dashboard analytics', data: {} };
  }
}