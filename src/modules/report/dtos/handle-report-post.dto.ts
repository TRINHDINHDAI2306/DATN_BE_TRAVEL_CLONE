import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { HandleReportPostAction } from 'src/shares/enum/report.enum';

export class HandleReportPostDto {
  @ApiProperty({ required: false })
  @IsEnum(HandleReportPostAction, { message: 'Hành động xử lý báo cáo không hợp lệ' })
  @IsNotEmpty({ message: 'Hành động xử lý báo cáo không được để trống' })
  action: HandleReportPostAction;

  @ApiProperty({ required: false })
  @IsNumber({}, { message: 'ID báo cáo phải là một số' })
  @IsNotEmpty({ message: 'ID báo cáo không được để trống' })
  reportId: number;
}
