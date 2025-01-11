import { IsNotEmpty, IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateConsultationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsNumber()
  tourGuideId: number;
}