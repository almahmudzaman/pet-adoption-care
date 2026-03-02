import { 
  IsEmail, 
  IsString, 
  Matches, 
  IsDateString, 
  IsOptional, 
  IsUrl, 
  IsIn, 
  IsDefined, 
  IsNotEmpty, 
  IsNumber, 
  IsInt, 
  IsPositive, 
  IsEnum 
} from 'class-validator';

enum UserStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  INACTIVE = 'inactive',
}


export class AdminLoginDto {
  @IsDefined({ message: 'Email is required' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail()
  email: string;

  @IsDefined({ message: 'Password is required' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @IsString()
  @Matches(/[@#$&]/, {
    message: 'Password must contain at least one special character: @ # $ &',
  })
  password: string;
}

export class UpdateUserDto {
  
  @IsString()
  @Matches(/^[a-zA-Z\s]*$/, {
    message: 'Name field should not contain any numbers',
  })
  name?: string;

  
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail()
  email?: string;

  
  @IsString()
  role?: string;

  
  @IsString()
  status?: string;
}

export class UpdateUserStatusDto {
  @IsDefined({ message: 'Status is required' })
  @IsNotEmpty({ message: 'Status cannot be empty' })
  @IsEnum(UserStatus)
  status: 'active' | 'suspended' | 'inactive';

  
  @IsString()
  reason?: string;
}

export class UserFilterQueryDto {
  
  @IsString()
  role?: string;

  
  @IsString()
  status?: string;
}

export class PetFilterQueryDto {
  
  @IsString()
  status?: string;

  
  @IsString()
  breed?: string;
}

export class PaymentFilterQueryDto {
  
  @IsString()
  status?: string;

  
  @IsDateString()
  startDate?: string;

  
  @IsDateString()
  endDate?: string;

}

export class AnalyticsQueryDto {
  
  @IsDateString()
  startDate?: string;

  
  @IsDateString()
  endDate?: string;

}

export class UpdateUserProfileDto {
  
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @IsString()
  @Matches(/^[a-zA-Z\s]*$/, {
    message: 'Name field should not contain any numbers',
  })
  name?: string;

  
  @IsNotEmpty({ message: 'Facebook URL cannot be empty' })
  @IsUrl()
  facebookUrl?: string;

  
  @IsNotEmpty({ message: 'Twitter URL cannot be empty' })
  @IsUrl()
  twitterUrl?: string;

  
  @IsNotEmpty({ message: 'Instagram URL cannot be empty' })
  @IsUrl()
  instagramUrl?: string;

  
  @IsNotEmpty({ message: 'LinkedIn URL cannot be empty' })
  @IsUrl()
  linkedinUrl?: string;
}