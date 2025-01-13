import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class PrepaidOrderDto {
  @ApiProperty()
  @IsNumber({}, { message: 'ID đơn hàng phải là số' })
  @IsNotEmpty({ message: 'ID đơn hàng không được để trống' })
  orderId: number;
}
