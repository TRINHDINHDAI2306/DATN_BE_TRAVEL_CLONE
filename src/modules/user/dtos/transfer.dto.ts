import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class TransferDto {
  @ApiProperty()
  @IsPositive({ message: 'Số tiền phải lớn hơn 0' })
  @IsNotEmpty({ message: 'Số tiền là bắt buộc' })
  amount: number;

  @ApiProperty()
  @IsBoolean({ message: 'Trường fromWeb phải là giá trị boolean' })
  @IsOptional({ message: 'Trường fromWeb là tùy chọn' })
  fromWeb: boolean;
}
