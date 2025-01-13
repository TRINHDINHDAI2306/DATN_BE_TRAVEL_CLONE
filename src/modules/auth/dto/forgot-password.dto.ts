import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ForgotPasswordDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Địa chỉ email không hợp lệ' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'Mật khẩu phải là chuỗi' })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  password: string;

  @ApiProperty()
  @IsString({ message: 'OTP phải là chuỗi' })
  @IsNotEmpty({ message: 'OTP không được để trống' })
  otp: string;
}
