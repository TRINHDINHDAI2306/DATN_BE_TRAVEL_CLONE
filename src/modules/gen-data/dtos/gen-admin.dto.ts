import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class GenAdminDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Địa chỉ email không hợp lệ' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Tên người dùng không được để trống' })
  @IsString({ message: 'Tên người dùng phải là chuỗi' })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Mật khẩu quá yếu. Mật khẩu phải có chữ hoa, chữ thường và ký tự đặc biệt hoặc số.',
  })
  @IsString({ message: 'Mật khẩu phải là chuỗi' })
  password: string;
}
