import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { BasePaginationRequestDto } from 'src/shares/dtos/base-pagination.dto';
import { TourguideStatus } from 'src/shares/enum/tourguide.enum';

export class GetListAdminDto extends BasePaginationRequestDto {
  @ApiProperty({ required: false, description: 'Từ khóa tìm kiếm' })
  @IsString({ message: 'Từ khóa phải là chuỗi ký tự' })
  @IsOptional()
  keyword: string;
}
