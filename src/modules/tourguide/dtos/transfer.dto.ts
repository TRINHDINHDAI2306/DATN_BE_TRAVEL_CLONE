import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';
export class TransferDto {
  @ApiProperty()
  @IsPositive({ message: 'Số tiền phải là số dương' })
  @IsNotEmpty({ message: 'Số tiền là bắt buộc' })
  amount: number;

  @ApiProperty()
  @IsBoolean({ message: 'Giá trị fromWeb phải là kiểu boolean' })
  @IsOptional()
  fromWeb: boolean;
}
