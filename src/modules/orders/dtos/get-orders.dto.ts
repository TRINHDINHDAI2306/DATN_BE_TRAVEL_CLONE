import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { GetTourOptions } from 'src/shares/enum/order.enum';

export class GetOrdersDto {
  @ApiProperty()
  @IsEnum(GetTourOptions, { message: 'Loại tour không hợp lệ' })
  @IsNotEmpty({ message: 'Loại tour không được để trống' })
  type: GetTourOptions;
}
