import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { BasePaginationRequestDto } from 'src/shares/dtos/base-pagination.dto';

export class GetTourDto extends BasePaginationRequestDto {
  @ApiProperty({ required: false })
  @IsNumber({}, { message: 'ID tỉnh phải là một số' })
  @IsOptional()
  provinceId: number;

  @ApiProperty({ required: false })
  @IsNumber({}, { message: 'ID hướng dẫn viên phải là một số' })
  @IsOptional()
  tourGuideId: number;

  @ApiProperty({ required: false })
  @IsNumber({}, { message: 'Giá tối thiểu phải là một số' })
  @IsOptional()
  minPrice: number;

  @ApiProperty({ required: false })
  @IsNumber({}, { message: 'Giá tối đa phải là một số' })
  @IsOptional()
  maxPrice: number;

  @ApiProperty({ required: false })
  @IsString({ message: 'Loại tour phải là một chuỗi' })
  @IsOptional()
  types: string;
}
