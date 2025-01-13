import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class getProvinceDto {
  @ApiProperty({ required: false })
  @IsString({ message: 'Từ khóa tìm kiếm phải là một chuỗi' })
  @IsOptional()
  keyword: string;
}
