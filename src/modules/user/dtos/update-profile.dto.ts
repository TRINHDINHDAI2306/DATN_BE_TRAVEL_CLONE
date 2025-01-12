import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail, IsPhoneNumber, IsUrl, Matches } from 'class-validator';

export class UpdateProfileDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    username?: string;

    @ApiProperty()
    @IsOptional()
    phone?: string;
    
    @ApiProperty()
    @IsOptional()
    avatar?: string;
}