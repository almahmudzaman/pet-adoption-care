/*User Category 2: 
• Email Address field is required, and the input must contain aiub.edu 
domain 
• Password field must be at least 6 character long and it must contain one 
Uppercase character  
• Validate gender given male or female. 
• Phone Number field must contain only numbers */

import { IsString, IsEmail, MinLength, Matches, IsEnum, IsOptional } from 'class-validator';

export class RegisterAdopterDto {
  @IsString()
  @Matches(/^[A-Za-z\s]+$/, { message: 'Name should contain only alphabets and spaces' })
  name!: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @Matches(/@aiub\.edu$/, { message: 'Email must end with @aiub.edu' })
  email!: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
  password!: string;

  @IsOptional()
  @IsEnum(['male', 'female'], { message: 'Gender must be male or female' })
  gender?: string;

  @IsOptional()
  @Matches(/^\+?[0-9]{10,15}$/, { message: 'Phone number must be valid and contain 10–15 digits' })
  phone?: string;

  @IsOptional()
  @IsString()
  @MinLength(5, { message: 'Address must be at least 5 characters long' })
  address?: string;

  @IsOptional()
  @IsEnum(['dog', 'cat', 'bird', 'other'], { message: 'Preferred species must be dog, cat, bird, or other' })
  preferredSpecies?: string;
}
