import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { ActionResponseRegisterTourguide } from 'src/shares/enum/tourguide.enum';

export class ResponseRegisterTourguideDto {
  @ApiProperty()
  @IsNumber({}, { message: 'ID hướng dẫn viên phải là một số' })
  @IsNotEmpty({ message: 'ID hướng dẫn viên là bắt buộc' })
  tourGuideId: number;

  @ApiProperty()
  @IsEnum(ActionResponseRegisterTourguide, {
    message: 'Hành động không hợp lệ. Vui lòng kiểm tra lại.',
  })
  @IsNotEmpty({ message: 'Hành động là bắt buộc' })
  action: ActionResponseRegisterTourguide;

  @ApiProperty()
  @IsDateString({}, { message: 'Ngày phỏng vấn phải đúng định dạng ngày giờ' })
  @IsOptional()
  interviewDate: Date;
}
