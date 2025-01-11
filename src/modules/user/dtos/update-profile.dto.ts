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

    @ApiProperty()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    })

    @ApiProperty()
    @IsString()
    password: string;
    
    @ApiProperty()
    @IsString()
    confirmPassword: string;
}