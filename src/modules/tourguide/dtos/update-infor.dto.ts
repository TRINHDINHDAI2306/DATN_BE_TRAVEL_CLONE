import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateTourguideInformationDto {
  @ApiProperty()
  @IsString({ message: 'Số điện thoại phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Số điện thoại là bắt buộc' })
  @MaxLength(10, { message: 'Số điện thoại phải có đúng 10 ký tự' })
  @MinLength(10, { message: 'Số điện thoại phải có đúng 10 ký tự' })
  phone: string;

  @ApiProperty()
  @IsString({ message: 'Ảnh đại diện phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Ảnh đại diện là bắt buộc' })
  avatar: string;

  @ApiProperty()
  @IsString({ message: 'Tiểu sử phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Tiểu sử là bắt buộc' })
  bio: string;
}
