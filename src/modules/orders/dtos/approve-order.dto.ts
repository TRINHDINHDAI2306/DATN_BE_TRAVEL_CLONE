import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { ActionApproveOrder } from 'src/shares/enum/order.enum';

export class ApproveOrderDto {
  @ApiProperty()
  @IsNumber({}, { message: 'ID đơn hàng phải là số' })
  @IsNotEmpty({ message: 'ID đơn hàng không được để trống' })
  orderId: number;

  @ApiProperty()
  @IsEnum(ActionApproveOrder, { message: 'Hành động phê duyệt không hợp lệ' })
  @IsNotEmpty({ message: 'Hành động không được để trống' })
  action: ActionApproveOrder;
}
