import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { TourguideStatus } from 'src/shares/enum/tourguide.enum';

export class UpdateStatusTourGuideDto {
  @ApiProperty()
  @IsEnum(TourguideStatus, {
    message: 'Trạng thái hướng dẫn viên không hợp lệ',
  })
  @IsNotEmpty({ message: 'Trạng thái hướng dẫn viên là bắt buộc' })
  status: TourguideStatus;

  @ApiProperty({ required: false })
  @IsNumber({}, { message: 'ID hướng dẫn viên phải là một số' })
  @IsNotEmpty({ message: 'ID hướng dẫn viên là bắt buộc' })
  tourGuideId: number;
}