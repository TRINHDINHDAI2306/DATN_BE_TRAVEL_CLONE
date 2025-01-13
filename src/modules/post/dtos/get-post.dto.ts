import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { BasePaginationRequestDto } from 'src/shares/dtos/base-pagination.dto';
import { PostStatus, Topics } from 'src/shares/enum/post.enum';

export class AdminGetPostDto extends BasePaginationRequestDto {
  @ApiProperty()
  @IsEnum(PostStatus, { message: 'Trạng thái bài viết không hợp lệ' })
  @IsNotEmpty({ message: 'Trạng thái bài viết không được để trống' })
  status: PostStatus;

  @ApiProperty({ required: false })
  @IsString({ message: 'Từ khóa phải là một chuỗi' })
  @IsOptional()
  keyword: string;
}

export class GetPostDto extends BasePaginationRequestDto {
  @ApiProperty({ required: false })
  @IsEnum(Topics, { message: 'Chủ đề bài viết không hợp lệ' })
  @IsOptional()
  topics: Topics;

  @ApiProperty({ required: false })
  @IsString({ message: 'Từ khóa phải là một chuỗi' })
  @IsOptional()
  keyword: string;
}
