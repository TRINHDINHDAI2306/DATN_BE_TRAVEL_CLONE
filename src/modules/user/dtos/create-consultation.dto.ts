import { IsNotEmpty, IsString, IsEmail, IsNumber } from 'class-validator';

export class CreateConsultationDto {
  @IsNotEmpty({ message: 'Tên là bắt buộc' })
  @IsString({ message: 'Tên phải là chuỗi ký tự' })
  name: string;

  @IsNotEmpty({ message: 'Số điện thoại là bắt buộc' })
  @IsString({ message: 'Số điện thoại phải là chuỗi ký tự' })
  phone: string;

  @IsNotEmpty({ message: 'Email là bắt buộc' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @IsNotEmpty({ message: 'Tin nhắn là bắt buộc' })
  @IsString({ message: 'Tin nhắn phải là chuỗi ký tự' })
  message: string;

  @IsNotEmpty({ message: 'ID hướng dẫn viên là bắt buộc' })
  @IsNumber({}, { message: 'ID hướng dẫn viên phải là một số hợp lệ' })
  tourGuideId: number;
}
