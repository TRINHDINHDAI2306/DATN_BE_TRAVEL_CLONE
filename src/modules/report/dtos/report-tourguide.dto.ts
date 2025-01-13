import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReportOrderDto {
  @ApiProperty()
  @IsString({ message: 'Nội dung báo cáo phải là một chuỗi' })
  @IsNotEmpty({ message: 'Nội dung báo cáo không được để trống' })
  content: string;

  @ApiProperty()
  @IsNumber({}, { message: 'ID đơn hàng phải là một số' })
  @IsNotEmpty({ message: 'ID đơn hàng không được để trống' })
  orderId: number;
}
