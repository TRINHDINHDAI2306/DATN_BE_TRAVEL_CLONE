import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty()
  @IsOptional({ message: 'Tên người dùng là tùy chọn' })
  @IsString({ message: 'Tên người dùng phải là chuỗi ký tự' })
  username?: string;

  @ApiProperty()
  @IsOptional({ message: 'Số điện thoại là tùy chọn' })
  @IsString({ message: 'Số điện thoại phải là chuỗi ký tự' })
  phone?: string;
  
  @ApiProperty()
  @IsOptional({ message: 'Ảnh đại diện là tùy chọn' })
  @IsString({ message: 'Ảnh đại diện phải là chuỗi ký tự' })
  avatar?: string;
}
