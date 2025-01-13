import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsUrl,
  IsOptional,
} from 'class-validator';
import { Topics } from 'src/shares/enum/post.enum';

export class CreateBlogDto {
  @ApiProperty()
  @IsString({ message: 'Tiêu đề phải là một chuỗi' })
  @IsNotEmpty({ message: 'Tiêu đề không được để trống' })
  title: string;

  @ApiProperty()
  @IsString({ message: 'Nội dung phải là một chuỗi' })
  @IsNotEmpty({ message: 'Nội dung không được để trống' })
  content: string;

  @ApiProperty()
  @IsEnum(Topics, { message: 'Chủ đề không hợp lệ' })
  @IsNotEmpty({ message: 'Chủ đề không được để trống' })
  topic: Topics;

  @ApiProperty()
  @IsString({ message: 'Hình ảnh phải là một chuỗi' })
  @IsOptional()
  image: string;
}
