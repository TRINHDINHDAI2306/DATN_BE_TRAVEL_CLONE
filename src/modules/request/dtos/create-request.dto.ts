import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRequestDto {
  @ApiProperty({ required: true })
  @IsNumber({}, { message: 'ID tỉnh phải là một số' })
  @IsNotEmpty({ message: 'ID tỉnh không được để trống' })
  provinceId: number;

  @ApiProperty({ required: true })
  @IsString({ message: 'Nội dung phải là một chuỗi' })
  @IsNotEmpty({ message: 'Nội dung không được để trống' })
  content: string;

  @ApiProperty()
  @IsDateString({}, { message: 'Ngày bắt đầu không hợp lệ' })
  @IsNotEmpty({ message: 'Ngày bắt đầu không được để trống' })
  startDate: Date;
}
