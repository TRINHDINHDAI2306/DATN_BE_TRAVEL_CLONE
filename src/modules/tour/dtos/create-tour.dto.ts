import { ApiProperty } from '@nestjs/swagger';
import { 
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty, 
  IsNumber, 
  IsString,
  ValidateNested,
} from 'class-validator';
import { TourScheduleDto } from './tour-schedule.dto';
import { Type } from 'class-transformer';
import { TourImagesDto } from './tour-images.dto';
import { TourTypes } from 'src/shares/enum/tour.enum';

export class CreateTourDto {
  @ApiProperty()
  @IsString({ message: 'Tên tour phải là một chuỗi ký tự.' })
  @IsNotEmpty({ message: 'Tên tour không được để trống.' })
  name: string;

  @ApiProperty()
  @IsString({ message: 'Mô tả phải là một chuỗi ký tự.' })
  @IsNotEmpty({ message: 'Mô tả không được để trống.' })
  description: string;

  @ApiProperty()
  @IsNumber({}, { message: 'Giá cơ bản phải là một số.' })
  @IsNotEmpty({ message: 'Giá cơ bản không được để trống.' })
  basePrice: number;

  @ApiProperty()
  @IsString({ message: 'Tóm tắt phải là một chuỗi ký tự.' })
  @IsNotEmpty({ message: 'Tóm tắt không được để trống.' })
  overview: string;

  @ApiProperty()
  @IsNumber({}, { message: 'Phí mỗi thành viên phải là một số.' })
  @IsNotEmpty({ message: 'Phí mỗi thành viên không được để trống.' })
  feePerMember: number;

  @ApiProperty()
  @IsNumber({}, { message: 'Mã tỉnh/thành phố phải là một số.' })
  @IsNotEmpty({ message: 'Mã tỉnh/thành phố không được để trống.' })
  provinceId: number;

  @ApiProperty()
  @IsNumber({}, { message: 'Số lượng tối đa thành viên phải là một số' })
  @IsNotEmpty({ message: 'Số lượng tối đa thành viên không được để trống' })
  maxMember: number;

  @ApiProperty()
  @IsEnum(TourTypes, { message: 'Loại tour phải thuộc một trong các giá trị hợp lệ.' })
  @IsNotEmpty({ message: 'Loại tour không được để trống.' })
  type: TourTypes;

  @ApiProperty({ type: [TourScheduleDto] })
  @IsArray({ message: 'Danh sách lịch trình tour phải là một mảng.' })
  @ArrayMinSize(1, { message: 'Danh sách lịch trình tour phải có ít nhất một phần tử.' })
  @Type(() => TourScheduleDto)
  @ValidateNested({ each: true, message: 'Mỗi lịch trình phải là một đối tượng hợp lệ.' })
  tourSchedules: TourScheduleDto[];

  @ApiProperty({ type: [TourImagesDto] })
  @IsArray({ message: 'Danh sách hình ảnh tour phải là một mảng.' })
  @ArrayMinSize(1, { message: 'Danh sách hình ảnh tour phải có ít nhất một phần tử.' })
  @Type(() => TourImagesDto)
  @ValidateNested({ each: true, message: 'Mỗi hình ảnh phải là một đối tượng hợp lệ.' })
  tourImages: TourImagesDto[];
}
