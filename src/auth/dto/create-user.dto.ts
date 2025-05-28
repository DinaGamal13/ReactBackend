import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3, { message: 'UserName must be at least 3 characters' })
  @Matches(/^[^\d]*$/, { message: 'UserName must contain only Characters' })
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @Matches(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' })
  @Matches(/(?=.*\d)/, { message: 'Password must contain at least one number' })
  @Matches(/(?=.*[!@#$%^&*])/, { message: 'Password must contain at least one special character' })
  password: string;
}