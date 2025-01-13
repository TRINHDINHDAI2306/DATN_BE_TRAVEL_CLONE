import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { BasePaginationRequestDto } from 'src/shares/dtos/base-pagination.dto';

export class GetTourWithTourGuideDto extends BasePaginationRequestDto {
  @ApiProperty({ required: false })
  @IsNumber({}, { message: 'provinceId phải là một số' }) // Sử dụng @IsNumber() cho provinceId
  @IsOptional()
  provinceId: number;

  @ApiProperty({ required: false })
  @IsNumber({}, { message: 'minPrice phải là một số' }) // Sử dụng @IsNumber() cho minPrice
  @IsOptional()
  minPrice: number;

  @ApiProperty({ required: false })
  @IsNumber({}, { message: 'maxPrice phải là một số' }) // Sử dụng @IsNumber() cho maxPrice
  @IsOptional()
  maxPrice: number;

  @ApiProperty({ required: false })
  @IsString({ message: 'types phải là một chuỗi' }) // Giữ lại @IsString() cho types
  @IsOptional()
  types: string;
}
