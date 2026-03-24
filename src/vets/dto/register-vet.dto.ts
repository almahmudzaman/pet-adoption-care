import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterVetDto {
 
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z\s]+$/, { message: 'Name must contain only alphabets' })
  name: string;


  @IsString()
  @IsNotEmpty()
  @Matches(/^[^\s@]+@[^\s@]+\.aiub.edu$/, {
    message: 'Email must be a valid email and end with .aiub.edu domain',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  clinicName: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  specialization?: string;

 
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{10}|\d{13}|\d{17}$/, {
    message: 'NID must be 10, 13, or 17 digits',
  })
  nidNumber: string;
}