// Admin Login DTO
export class AdminLoginDto {
  email: string;
  password: string;

  constructor(partial?: Partial<AdminLoginDto>) {
    this.email = partial?.email || '';
    this.password = partial?.password || '';
  }
}

// User Query DTO
export class UserQueryDto {
  role?: string;
  status?: string;
  limit?: number;
  offset?: number;
}

// Update User Status DTO
export class UpdateUserStatusDto {
  status: 'active' | 'suspended' | 'inactive';
  reason?: string;
}

// Full User update DTO (used by PUT /admin/users/:userId)
export class UpdateUserDto {
  name?: string;
  email?: string;
  role?: string;
  status?: 'active' | 'suspended' | 'inactive';
}
// Pet Moderation Query DTO
export class PetModerationQueryDto {
  status?: string;
  reported?: boolean;
  limit?: number;
  offset?: number;
}

// Admin Application Query DTO
export class AdminApplicationQueryDto {
  status?: string;
  petId?: string;
  limit?: number;
  offset?: number;
}

// Payment Report Query DTO
export class PaymentReportQueryDto {
  startDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
}

// Consultation Report Query DTO
export class ConsultationReportQueryDto {
  vetId?: string;
  status?: string;
  limit?: number;
  offset?: number;
}

// Review Moderation Query DTO
export class ReviewModerationQueryDto {
  rating?: number;
  reported?: boolean;
  limit?: number;
  offset?: number;
}
