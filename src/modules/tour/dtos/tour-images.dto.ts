import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class TourImagesDto {
  @ApiProperty()
  @IsUrl()
  @IsNotEmpty({ message: 'URL không được để trống' })
  url: string;
}
