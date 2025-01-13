import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BasePaginationRequestDto } from 'src/shares/dtos/base-pagination.dto';
import { Direction } from 'src/shares/enum/order.enum';
import { Gender, TourguideStatus } from 'src/shares/enum/tourguide.enum';

export class AdminGetTourGuideDto extends BasePaginationRequestDto {
  @ApiProperty()
  @IsEnum(TourguideStatus, { message: 'Trạng thái hướng dẫn viên không hợp lệ' })
  @IsNotEmpty({ message: 'Trạng thái hướng dẫn viên là bắt buộc' })
  status: TourguideStatus;

  @ApiProperty({ required: false })
  @IsString({ message: 'Từ khóa phải là chuỗi ký tự' })
  @IsOptional()
  keyword: string;
}
export class GetTourGuideDto extends BasePaginationRequestDto {
  @ApiProperty({ required: false })
  @IsString({ message: 'Tỉnh thành phải là chuỗi ký tự' })
  @IsOptional()
  provinces: string;

  @ApiProperty({ required: false })
  @IsEnum(Gender, { message: 'Giới tính không hợp lệ' })
  @IsOptional()
  gender: Gender;

  @ApiProperty({ required: false })
  @IsString({ message: 'Từ khóa phải là chuỗi ký tự' })
  @IsOptional()
  keyword: string;

  @ApiProperty({ required: false })
  @IsEnum(Direction, { message: 'Hướng dẫn tổng số tour không hợp lệ' })
  @IsOptional()
  totalTourDirection: Direction;

  @ApiProperty({ required: false })
  @IsEnum(Direction, { message: 'Hướng dẫn tổng số yêu thích không hợp lệ' })
  @IsOptional()
  totalFavorite: Direction;
}
