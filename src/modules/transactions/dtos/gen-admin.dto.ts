import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class GenAdminDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Email là bắt buộc' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Tên người dùng là bắt buộc' })
  @IsString({ message: 'Tên người dùng phải là chuỗi ký tự' })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Mật khẩu là bắt buộc' })
  @IsString({ message: 'Mật khẩu phải là chuỗi ký tự' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Mật khẩu phải chứa ít nhất 1 ký tự viết hoa, 1 ký tự viết thường và 1 ký tự đặc biệt hoặc chữ số',
  })
  password: string;
}
