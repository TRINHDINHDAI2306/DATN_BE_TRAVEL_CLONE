import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { AdminApproveAction } from 'src/shares/enum/tour.enum';

export class ApproveTourDto {
  @ApiProperty()
  @IsNumber({}, { message: 'ID tour phải là một số' })
  @IsNotEmpty({ message: 'ID tour không được để trống' })
  tourId: number;

  @ApiProperty()
  @IsEnum(AdminApproveAction, { message: 'Hành động phê duyệt không hợp lệ' })
  @IsNotEmpty({ message: 'Hành động phê duyệt không được để trống' })
  action: AdminApproveAction;
}
