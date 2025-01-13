import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class WithdrawDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Số tiền là bắt buộc' })
  @IsNumber({}, { message: 'Số tiền phải là một số hợp lệ' })
  amount: number;
}