import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  Matches,
  IsEnum,
} from 'class-validator';

export class ActiveAdminDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Định dạng email không hợp lệ' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Tên người dùng không được để trống' })
  @IsString({ message: 'Tên người dùng phải là chuỗi ký tự' })
  username: string;

  @ApiProperty()
  @IsString({ message: 'Token phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Token không được để trống' })
  token: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  message: 'Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, và một ký tự đặc biệt hoặc số',
  })
  @IsString({ message: 'Mật khẩu phải là chuỗi ký tự' })
  password: string;
}
