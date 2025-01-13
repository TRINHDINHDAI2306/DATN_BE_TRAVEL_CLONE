import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { AdminStatus } from 'src/shares/enum/admin.enum';
import { ChangeStatus } from 'src/shares/enum/user.enum';

export class AdminUpdateMod {
  @ApiProperty()
  @IsEnum(AdminStatus, { message: 'Trạng thái không hợp lệ' })
  @IsNotEmpty({ message: 'Trạng thái không được để trống' })
  status: AdminStatus;

  @ApiProperty({ required: true })
  @IsNumber({}, { message: 'modId phải là số' })
  @IsNotEmpty({ message: 'modId không được để trống' })
  modId: number;

  @ApiProperty({ required: true })
  @IsNumber({}, { message: 'Cấp độ phải là số' })
  @IsNotEmpty({ message: 'Cấp độ không được để trống' })
  level: number;
}
