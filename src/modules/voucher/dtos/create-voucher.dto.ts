import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { DiscountType } from 'src/shares/enum/voucher.enum';

export class CreateVoucherDto {
  @ApiProperty()
  @IsString({ message: 'Tên voucher phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Tên voucher là bắt buộc' })
  name: string;

  @ApiProperty()
  @IsString({ message: 'Mô tả voucher phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Mô tả voucher là bắt buộc' })
  description: string;

  @ApiProperty()
  @IsString({ message: 'Mã voucher phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Mã voucher là bắt buộc' })
  code: string;

  @ApiProperty()
  @IsEnum(DiscountType, { message: 'Loại giảm giá không hợp lệ' })
  @IsNotEmpty({ message: 'Loại giảm giá là bắt buộc' })
  discountType: DiscountType;

  @ApiProperty()
  @IsInt({ message: 'Điểm yêu cầu phải là số nguyên' })
  @Min(0, { message: 'Điểm yêu cầu không được nhỏ hơn 0' })
  @IsNotEmpty({ message: 'Điểm yêu cầu là bắt buộc' })
  requirementPoint: number;

  @ApiProperty()
  @IsPositive({ message: 'Giá trị voucher phải lớn hơn 0' })
  @IsNotEmpty({ message: 'Giá trị voucher là bắt buộc' })
  value: number;

  @ApiProperty()
  @IsPositive({ message: 'Số lượng voucher phải lớn hơn 0' })
  @IsNotEmpty({ message: 'Số lượng voucher là bắt buộc' })
  quantity: number;

  @ApiProperty()
  @IsDateString({ message: 'Ngày bắt đầu phải là một chuỗi ngày hợp lệ' })
  @IsNotEmpty({ message: 'Ngày bắt đầu là bắt buộc' })
  startDate: Date;

  @ApiProperty()
  @IsDateString({ message: 'Ngày kết thúc phải là một chuỗi ngày hợp lệ' })
  @IsNotEmpty({ message: 'Ngày kết thúc là bắt buộc' })
  endDate: Date;
}
