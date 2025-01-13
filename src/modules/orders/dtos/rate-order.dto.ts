import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class RateOrderDto {
  @ApiProperty()
  @IsNumber({}, { message: 'ID đơn hàng phải là số' })
  @IsNotEmpty({ message: 'ID đơn hàng không được để trống' })
  orderId: number;

  @ApiProperty()
  @IsString({ message: 'Nội dung phải là một chuỗi' })
  @IsOptional()
  content: string;

  @ApiProperty()
  @IsString({ message: 'Hình ảnh phải là một chuỗi' })
  @IsOptional()
  image: string;

  @ApiProperty()
  @IsNumber({}, { message: 'Đánh giá phải là một số' })
  @Min(1, { message: 'Đánh giá phải lớn hơn hoặc bằng 1' })
  @Max(5, { message: 'Đánh giá phải nhỏ hơn hoặc bằng 5' })
  @IsNotEmpty({ message: 'Đánh giá không được để trống' })
  star: number;
}
