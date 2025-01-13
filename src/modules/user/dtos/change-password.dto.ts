import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty()
  @IsString({ message: 'Mật khẩu hiện tại phải là chuỗi ký tự' })
  currentPassword: string;

  @ApiProperty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Mật khẩu mới phải chứa ít nhất 1 ký tự viết hoa, 1 ký tự viết thường và 1 ký tự đặc biệt hoặc chữ số',
  })
  @IsString({ message: 'Mật khẩu mới phải là chuỗi ký tự' })
  newPassword: string;
}
