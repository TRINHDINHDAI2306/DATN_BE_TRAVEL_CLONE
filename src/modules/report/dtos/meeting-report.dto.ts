import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsNotEmpty,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateMeetingReportDto {
  @ApiProperty()
  @IsNumber({}, { message: 'ID báo cáo phải là một số' })
  @IsNotEmpty({ message: 'ID báo cáo không được để trống' })
  reportId: number;

  @ApiProperty()
  @IsDateString({}, { message: 'Ngày họp không hợp lệ' })
  @IsOptional()
  meetingDate: Date;
}
