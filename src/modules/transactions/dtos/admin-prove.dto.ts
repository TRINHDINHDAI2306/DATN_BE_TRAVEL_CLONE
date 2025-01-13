import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { AproveActionWithdraw } from 'src/shares/enum/transaction.enum';

export class AdminAproveWithdrawRequest {
  @ApiProperty()
  @IsNumber({}, { message: 'ID yêu cầu rút tiền phải là một số' })
  @IsNotEmpty({ message: 'ID yêu cầu rút tiền là bắt buộc' })
  withdrawId: number;

  @ApiProperty()
  @IsEnum(AproveActionWithdraw, {
    message: 'Hành động phê duyệt không hợp lệ',
  })
  @IsNotEmpty({ message: 'Hành động phê duyệt là bắt buộc' })
  action: AproveActionWithdraw;
}
