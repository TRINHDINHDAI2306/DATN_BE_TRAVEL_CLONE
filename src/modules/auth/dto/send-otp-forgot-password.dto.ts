import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SendOtpForgotPasswordDto {
  @ApiProperty()
  @IsString({ message: 'Email phải là chuỗi' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;
}
