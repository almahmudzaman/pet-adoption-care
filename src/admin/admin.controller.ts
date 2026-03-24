import { Controller, Get, Post, Patch, Put, Delete, Body, Param, Query, ParseIntPipe, ParseUUIDPipe, DefaultValuePipe, ParseEnumPipe, ValidationPipe } from '@nestjs/common';
import { AdminLoginDto, UpdateUserDto, UpdateUserStatusDto, UserFilterQueryDto, PetFilterQueryDto, PaymentFilterQueryDto, AnalyticsQueryDto, UpdateUserProfileDto } from './admin.dto';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  //Admin Login - POST /admin/login
  @Post('login')
  login(@Body(ValidationPipe) dto: AdminLoginDto): object {
    return this.adminService.adminLogin(dto.email, dto.password);
  }

  //All Users - GET /admin/users
  @Get('users')
  getAllUsers(
    @Query('role') role?: string,
    @Query('status') status?: string
  ): object {
    const query = { role, status };
    return this.adminService.getAllUsers(query);
  }

  //Get Single User - GET /admin/users/:userId
  @Get('users/:userId')
  getUser(@Param('userId', ParseUUIDPipe) userId: string): object {
    return this.adminService.getUser(userId);
  }

  //Full Update User - PUT /admin/users/:userId
  @Put('users/:userId')
  updateUser(@Param('userId', ParseUUIDPipe) userId: string, @Body(ValidationPipe) dto: UpdateUserDto): object {
    return this.adminService.updateUser(userId, dto);
  }

  //Update User Status - PATCH /admin/users/:userId/status
  @Patch('users/:userId/status')
  updateStatus(@Param('userId', ParseUUIDPipe) userId: string, @Body(ValidationPipe) dto: UpdateUserStatusDto): object {
    return this.adminService.updateUserStatus(userId, dto);
  }

  //Delete User - DELETE /admin/users/:userId
  @Delete('users/:userId')
  deleteUser(@Param('userId', ParseUUIDPipe) userId: string): object {
    return this.adminService.deleteUser(userId);
  }

  //Update User Profile with Social Media Links - PUT /admin/users/:userId/profile
  @Put('users/:userId/profile')
  updateUserProfile(@Param('userId', ParseUUIDPipe) userId: string, @Body(ValidationPipe) dto: UpdateUserProfileDto): object {
    return this.adminService.updateUserProfile(userId, dto);
  }

  // Get Pets - GET /admin/pets
  @Get('pets')
  getPets(
    @Query('status') status?: string,
    @Query('breed') breed?: string,
  ): object {
    const query = { status, breed };
    return this.adminService.getPets(query);
  }

  // Route 9: Delete Pet - DELETE /admin/pets/:petId
  @Delete('pets/:petId')
  deletePet(@Param('petId', ParseUUIDPipe) petId: string): object {
    return this.adminService.deletePet(petId);
  }

  // Route 10: Get Payments - GET /admin/payments
  @Get('payments')
  getPayments(
    @Query('status') status?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): object {
    const query = { status, startDate, endDate };
    return this.adminService.getPayments(query);
  }

  // Route 11: Get Dashboard Analytics - GET /admin/analytics
  @Get('analytics')
  getAnalytics(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string): object {
    const query = { startDate, endDate};
    return this.adminService.getDashboardAnalytics(query);
  }
}
