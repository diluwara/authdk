import { IsEmail, IsNotEmpty, MinLength, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid email address' })
  @Transform(({ value }) => value.trim())  // Trims whitespace from email
  email: string;

  @IsNotEmpty({ message: 'Name cannot be empty' })
  @Transform(({ value }) => value.trim())  // Trims whitespace from name
  name: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsNotEmpty({ message: 'Type cannot be empty' })
  @IsIn(['user', 'admin'], { message: 'Type must be either user or admin' })
  @Transform(({ value }) => value.trim())  // Trims whitespace from type
  type: string;
}
