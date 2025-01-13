import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReportPostDto {
  @ApiProperty()
  @IsString({ message: 'Nội dung báo cáo phải là một chuỗi' })
  @IsNotEmpty({ message: 'Nội dung báo cáo không được để trống' })
  content: string;

  @ApiProperty()
  @IsNumber({}, { message: 'ID bài viết phải là một số' })
  @IsNotEmpty({ message: 'ID bài viết không được để trống' })
  postId: number;
}
