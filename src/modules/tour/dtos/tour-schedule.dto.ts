import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class TourScheduleDto {
  @ApiProperty({ description: 'Content of the blog post' })
  @IsString({ message: 'Content phải là một chuỗi' })
  @IsNotEmpty({ message: 'Content không được để trống' })
  content: string;

  @ApiProperty({ description: 'Title of the blog post' })
  @IsString({ message: 'Title phải là một chuỗi' })
  @IsNotEmpty({ message: 'Title không được để trống' })
  title: string;

  @ApiProperty({ description: 'Optional image URL for the blog post', required: false })
  @IsString({ message: 'Image phải là một chuỗi' })
  @IsOptional()
  image: string;
}
