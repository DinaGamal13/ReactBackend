import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;


  @IsNotEmpty()
  @IsString()
  @IsUrl() 
  imageUrl: string;
}
