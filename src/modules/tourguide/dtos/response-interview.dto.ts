import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { ActionResponseRegisterTourguide } from 'src/shares/enum/tourguide.enum';

export class ResponseInterviewTourguideDto {
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
}