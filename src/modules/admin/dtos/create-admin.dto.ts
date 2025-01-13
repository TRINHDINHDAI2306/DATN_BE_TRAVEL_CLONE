import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  Matches,
  IsEnum,
} from 'class-validator';
import { AdminRole } from 'src/shares/enum/admin.enum';

export class CreateAdminDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Địa chỉ email không hợp lệ' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Tên người dùng không được để trống' })
  @IsString({ message: 'Tên người dùng phải là một chuỗi' })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Vai trò không được để trống' })
  @IsEnum(AdminRole, { message: 'Vai trò không hợp lệ' })
  role: AdminRole;
}
