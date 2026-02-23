import { Injectable } from '@nestjs/common';
import { UpdateUserStatusDto, UpdateUserDto } from './admin.dto';

@Injectable()
export class AdminService {
  private users = [
    { id: '1', name: 'Asif Akber', email: 'asifakber@pams.com', role: 'buyer', status: 'active' },
    { id: '2', name: 'Al-Mahmud Zaman', email: 'almahmud@pams.com', role: 'seller', status: 'active' },
  ];

  private pets = [
    { id: '1', name: 'Buddy', breed: 'Golden Retriever', status: 'active', reported: false },
    { id: '2', name: 'Max', breed: 'Labrador', status: 'active', reported: true },
    { id: '3', name: 'Luna', breed: 'Persian', status: 'inactive', reported: false },
  ];

  private applications = [
    { id: '1', userId: '1', petId: '1', status: 'pending', appliedDate: new Date() },
  ];

  private payments = [
    { id: '1', amount: 500, type: 'adoption', date: new Date(), status: 'completed' },
  ];

  private consultations = [
    { id: '1', vetId: '1', userId: '1', status: 'completed', bookingDate: new Date() },
  ];

  private reviews = [
    { id: '1', userId: '1', rating: 5, text: 'Great service', reported: false },
  ];

  // Route 1: Admin Login
  adminLogin(email: string, password: string) {
    try {
      if (!email || !password) {
        return { success: false, message: 'Email and password are required' };
      }

      const validAdmins = [
        { email: 'admin@example.com', password: 'admin123' },
        { email: 'admin@pams.com', password: 'admin123' },
      ];

      const admin = validAdmins.find((a) => a.email === email && a.password === password);
      if (!admin) {
        return { success: false, message: 'Invalid email or password' };
      }

      return { success: true, message: 'Login successful', data: { token: 'jwt-token-abc123' } };
    } catch (error) {
      return { success: false, message: 'Login error', error: error.message };
    }
  }

  // Route 2: Get All Users
  getAllUsers(role?: string, status?: string, limit: number = 10, offset: number = 0) {
    let filtered = this.users;
    if (role) filtered = filtered.filter((u) => u.role === role);
    if (status) filtered = filtered.filter((u) => u.status === status);

    return {
      success: true,
      data: filtered.slice(offset, offset + limit),
      total: filtered.length,
    };
  }

  // Route 3: Update User Status
  updateUserStatus(userId: string, data: UpdateUserStatusDto) {
    const user = this.users.find((u) => u.id === userId);
    if (!user) return { success: false, message: 'User not found' };

    user.status = data.status;
    return { success: true, message: 'User status updated', data: user };
  }

  // Route 3b: Get single user by id
  getUserById(userId: string) {
    const user = this.users.find((u) => u.id === userId);
    if (!user) return { success: false, message: 'User not found' };
    return { success: true, data: user };
  }

  // Route 4: Full update user (PUT)
  updateUser(userId: string, data: UpdateUserDto) {
    const user = this.users.find((u) => u.id === userId);
    if (!user) return { success: false, message: 'User not found' };

    user.name = data.name ?? user.name;
    user.email = data.email ?? user.email;
    user.role = data.role ?? user.role;
    user.status = data.status ?? user.status;

    return { success: true, message: 'User updated', data: user };
  }

  // Route 6: Delete user
  deleteUser(userId: string) {
    const index = this.users.findIndex((u) => u.id === userId);
    if (index === -1) return { success: false, message: 'User not found' };

    this.users.splice(index, 1);
    return { success: true, message: 'User deleted' };
  }

  // Route 4: Get Pets for Moderation
  getPets(status?: string, reported?: boolean, limit: number = 10, offset: number = 0) {
    let filtered = this.pets;
    if (status) filtered = filtered.filter((p) => p.status === status);
    if (reported !== undefined) filtered = filtered.filter((p) => p.reported === reported);

    return {
      success: true,
      data: filtered.slice(offset, offset + limit),
      total: filtered.length,
    };
  }

  // Route 5: Delete Pet
  deletePet(petId: string) {
    const index = this.pets.findIndex((p) => p.id === petId);
    if (index === -1) return { success: false, message: 'Pet not found' };

    this.pets.splice(index, 1);
    return { success: true, message: 'Pet deleted' };
  }

  // Route 6: Get Applications
  getApplications(status?: string, petId?: string, limit: number = 10, offset: number = 0) {
    let filtered = this.applications;
    if (status) filtered = filtered.filter((a) => a.status === status);
    if (petId) filtered = filtered.filter((a) => a.petId === petId);

    return {
      success: true,
      data: filtered.slice(offset, offset + limit),
      total: filtered.length,
    };
  }

  // Route 7: Get Payment Reports
  getPayments(startDate?: string, endDate?: string, limit: number = 10, offset: number = 0) {
    let filtered = this.payments;
    // Filter by date range if provided

    return {
      success: true,
      data: filtered.slice(offset, offset + limit),
      total: filtered.length,
      totalRevenue: filtered.reduce((sum, p) => sum + p.amount, 0),
    };
  }

  // Route 8: Get Consultation Reports
  getConsultations(vetId?: string, status?: string, limit: number = 10, offset: number = 0) {
    let filtered = this.consultations;
    if (vetId) filtered = filtered.filter((c) => c.vetId === vetId);
    if (status) filtered = filtered.filter((c) => c.status === status);

    return {
      success: true,
      data: filtered.slice(offset, offset + limit),
      total: filtered.length,
    };
  }

  // Route 9: Get Reviews for Moderation
  getReviews(rating?: number, reported?: boolean, limit: number = 10, offset: number = 0) {
    let filtered = this.reviews;
    if (rating) filtered = filtered.filter((r) => r.rating === rating);
    if (reported !== undefined) filtered = filtered.filter((r) => r.reported === reported);

    return {
      success: true,
      data: filtered.slice(offset, offset + limit),
      total: filtered.length,
    };
  }

  // Route 10: Get Dashboard Analytics
  getDashboardAnalytics() {
    return {
      success: true,
      data: {
        totalUsers: this.users.length,
        activeUsers: this.users.filter((u) => u.status === 'active').length,
        totalPets: this.pets.length,
        reportedPets: this.pets.filter((p) => p.reported).length,
        pendingApplications: this.applications.filter((a) => a.status === 'pending').length,
        totalRevenue: this.payments.reduce((sum, p) => sum + p.amount, 0),
        completedConsultations: this.consultations.filter((c) => c.status === 'completed').length,
        reportedReviews: this.reviews.filter((r) => r.reported).length,
      },
    };
  }
}
