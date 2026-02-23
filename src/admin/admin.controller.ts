import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import {
  AdminLoginDto,
  UserQueryDto,
  UpdateUserDto,
  UpdateUserStatusDto,
  PetModerationQueryDto,
  PaymentReportQueryDto,
} from './admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Route 1: POST /admin/login
  @Post('login')
  adminLogin(@Body() body: any) {
    try {
      if (!body || !body.email || !body.password) {
        return { success: false, message: 'Email and password are required' };
      }
      return this.adminService.adminLogin(body.email, body.password);
    } catch (error) {
      return { success: false, message: 'Login error', error: error.message };
    }
  }

  // Route 2: GET /admin/users
  @Get('users')
  getAllUsers(@Query() query: UserQueryDto) {
    return this.adminService.getAllUsers(query.role, query.status, query.limit, query.offset);
  }

  // Route 3: GET /admin/users/:userId
  @Get('users/:userId')
  getUser(@Param('userId') userId: string) {
    return this.adminService.getUserById(userId);
  }

  // Route 4: PUT /admin/users/:userId (full update)
  @Put('users/:userId')
  updateUser(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.adminService.updateUser(userId, updateUserDto);
  }

  // Route 5: PATCH /admin/users/:userId/status
  @Patch('users/:userId/status')
  updateUserStatus(@Param('userId') userId: string, @Body() updateUserStatusDto: UpdateUserStatusDto) {
    return this.adminService.updateUserStatus(userId, updateUserStatusDto);
  }

  // Route 7: GET /admin/pets
  @Get('pets')
  getPets(@Query() query: PetModerationQueryDto) {
    return this.adminService.getPets(query.status, query.reported, query.limit, query.offset);
  }

  // Route 8: DELETE /admin/pets/:petId
  @Delete('pets/:petId')
  deletePet(@Param('petId') petId: string) {
    return this.adminService.deletePet(petId);
  }
  // Route 9: GET /admin/payments
  @Get('payments')
  getPayments(@Query() query: PaymentReportQueryDto) {
    return this.adminService.getPayments(query.startDate, query.endDate, query.limit, query.offset);
  }

  // Route 10: GET /admin/analytics
  @Get('analytics')
  getDashboardAnalytics() {
    return this.adminService.getDashboardAnalytics();
  }

  // Route 6: DELETE /admin/users/:userId
  @Delete('users/:userId')
  deleteUser(@Param('userId') userId: string) {
    return this.adminService.deleteUser(userId);
  }
}
