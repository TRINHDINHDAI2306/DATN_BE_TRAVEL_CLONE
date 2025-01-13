import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';
import { BasePaginationRequestDto } from 'src/shares/dtos/base-pagination.dto';
import { GetReportStatus } from 'src/shares/enum/report.enum';

export class GetReportDto extends BasePaginationRequestDto {
  @ApiProperty({ required: false })
  @IsEnum(GetReportStatus, { message: 'Trạng thái báo cáo không hợp lệ' })
  @IsOptional()
  status: GetReportStatus;
}
