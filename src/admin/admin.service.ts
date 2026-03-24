import { Injectable } from '@nestjs/common';
import { UpdateUserDto, UpdateUserStatusDto, UserFilterQueryDto, PetFilterQueryDto, PaymentFilterQueryDto, AnalyticsQueryDto, UpdateUserProfileDto } from './admin.dto';

@Injectable()
export class AdminService {
  //Login
  adminLogin(email: string, password: string) {
    const validAdmins = [
      { email: 'admin@gmail.com', password: '@admin123' },
    ];
    const admin = validAdmins.find((a) => a.email === email && a.password === password);
    return admin ? { ok: true, message: 'Login successful' } : { ok: false, message: 'Invalid credentials' };
  }

  //All Users
  getAllUsers(query: UserFilterQueryDto) {
    return { message: 'All users fetched', data: [] };
  }

  //Get  User
  getUser(userId: string) {
    return { message: `User ${userId} fetched`, data: null };
  }

  //Update User
  updateUser(userId: string, updateUserDto: UpdateUserDto) {
    return { message: `User ${userId} updated`, data: updateUserDto };
  }

  //Update User Status
  updateUserStatus(userId: string, updateUserStatusDto: UpdateUserStatusDto) {
    return { message: `User ${userId} status updated`, data: updateUserStatusDto };
  }

  //Delete User
  deleteUser(userId: string) {
    return { message: `User ${userId} deleted`, ok: true };
  }

  //Update User Profile with Social Media Links
  updateUserProfile(userId: string, dto: UpdateUserProfileDto) {
    return { message: `User ${userId} profile updated`, data: dto };
  }

  //Get Pets
  getPets(query: PetFilterQueryDto) {
    return { message: 'All pets fetched', data: [] };
  }

  //Delete Pet
  deletePet(petId: string) {
    return { message: `Pet ${petId} deleted`, ok: true };
  }

  //Get Payments
  getPayments(query: PaymentFilterQueryDto) {
    return { message: 'All payments fetched', data: [] };
  }

  //Dashboard Analytics
  getDashboardAnalytics(query: AnalyticsQueryDto) {
    return { message: 'Dashboard analytics', data: {} };
  }
}