import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class RegisterSellerDto {
  @IsString()
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'Name must not contain any special character',
  })
  name: string;

  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/[a-z]/, { message: 'Password must contain at least one lowercase character' })
  password: string;

  @Matches(/^01[0-9]{9}$/, {
    message: 'Phone number must start with 01 and be 11 digits long',
  })
  phoneNumber: string;
}
