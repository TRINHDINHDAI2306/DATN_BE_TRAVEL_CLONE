import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { ChangeStatus } from 'src/shares/enum/user.enum';

export class AdminChangeStatusUserDto {
  @ApiProperty()
  @IsEnum(ChangeStatus, { message: 'Trạng thái thay đổi không hợp lệ' })
  @IsNotEmpty({ message: 'Trạng thái thay đổi là bắt buộc' })
  status: ChangeStatus;

  @ApiProperty({ required: false })
  @IsNumber({}, { message: 'ID người dùng phải là một số' })
  @IsNotEmpty({ message: 'ID người dùng là bắt buộc' })
  userId: number;
}
