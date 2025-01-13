import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class OrderTourDto {
  @ApiProperty()
  @IsNumber({}, { message: 'ID tour phải là số' })
  @IsNotEmpty({ message: 'ID tour không được để trống' })
  tourId: number;

  @ApiProperty()
  @IsNumber({}, { message: 'Số lượng thành viên phải là số' })
  @IsNotEmpty({ message: 'Số lượng thành viên không được để trống' })
  numberOfMember: number;

  @ApiProperty()
  @IsNumber({}, { message: 'ID voucher phải là số' })
  @IsOptional()
  voucherId: number;

  @ApiProperty()
  @IsDateString({}, { message: 'Ngày bắt đầu phải là định dạng ngày hợp lệ' })
  @IsNotEmpty({ message: 'Ngày bắt đầu không được để trống' })
  startDate: Date;

  // @ApiProperty({ type: [TourScheduleDto] })
  // @IsArray()
  // @ArrayMinSize(1)
  // @Type(() => TourScheduleDto)
  // @ValidateNested({ each: true })
  // tourSchedules: TourScheduleDto[];

  // @ApiProperty({ type: [TourImagesDto] })
  // @IsArray()
  // @ArrayMinSize(1)
  // @Type(() => TourImagesDto)
  // @ValidateNested({ each: true })
  // tourImages: TourImagesDto[];
}
