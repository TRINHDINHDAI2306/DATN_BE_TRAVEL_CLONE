import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { TourTypes } from 'src/shares/enum/tour.enum';

export class TourTypesDto {
  @ApiProperty({ required: false })
  @IsEnum(TourTypes, { message: 'Type phải là một trong các giá trị hợp lệ' })
  @IsNotEmpty()
  type: TourTypes;
}
