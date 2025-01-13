import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BasePaginationRequestDto } from 'src/shares/dtos/base-pagination.dto';

export class CommentDto {
  @ApiProperty()
  @IsString({ message: 'Nội dung phải là chuỗi' })
  @IsNotEmpty({ message: 'Nội dung không được để trống' })
  content: string;

  @ApiProperty()
  @IsNumber({}, { message: 'ID của bình luận phải là số' })
  @IsOptional()
  parrentCommentId: number;

  @ApiProperty()
  @IsNumber({}, { message: 'ID bài viết phải là số' })
  @IsOptional()
  postId: number;
}

export class GetCommentDto extends BasePaginationRequestDto {
  @ApiProperty()
  @IsString({ message: 'ID bài viết phải là chuỗi' })
  @IsOptional()
  postId: string;
}

export class UpdateCommentDto {
  @ApiProperty()
  @IsString({ message: 'Nội dung phải là chuỗi' })
  @IsNotEmpty({ message: 'Nội dung không được để trống' })
  content: string;

  @ApiProperty()
  @IsNumber({}, { message: 'ID bình luận phải là số' })
  @IsOptional()
  commentId: number;
}
