import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Gender } from 'src/shares/enum/tourguide.enum';

export class RegisterTourguideDto {
  @ApiProperty()
  @IsString({ message: 'Tên hướng dẫn viên không hợp lệ' })
  @IsNotEmpty({ message: 'Tên hướng dẫn viên không được để trống' })
  name: string;

  @ApiProperty()
  @IsString({ message: 'Tên đăng nhập không hợp lệ' })
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống' })
  username: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Địa chỉ email không hợp lệ' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'Mật khẩu không hợp lệ' })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  password: string;

  @ApiProperty()
  @IsString({ message: 'Số điện thoại không hợp lệ' })
  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  @MaxLength(10, { message: 'Số điện thoại không vượt quá 10 ký tự' })
  @MinLength(10, { message: 'Số điện thoại phải có ít nhất 10 ký tự' })
  phone: string;

  @ApiProperty()
  @IsDateString({}, { message: 'Ngày sinh không hợp lệ' })
  @IsNotEmpty({ message: 'Ngày sinh không được để trống' })
  dob: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'Giới tính không được để trống' })
  @IsEnum(Gender, { message: 'Giới tính không hợp lệ' })
  gender: Gender;

  @ApiProperty()
  @IsArray({ message: 'Các tỉnh không hợp lệ' })
  @ArrayMinSize(1, { message: 'Phải có ít nhất một tỉnh' })
  @ArrayMaxSize(3, { message: 'Tối đa chỉ được chọn 3 tỉnh' })
  provinces: number[]; // array of province ids where tourguide operates
}
