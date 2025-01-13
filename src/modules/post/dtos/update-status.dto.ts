import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { AdminAction, PostStatus } from 'src/shares/enum/post.enum';

export class UpdateStatusBlogDto {
  @ApiProperty()
  @IsNumber({}, { message: 'ID bài viết phải là một số' })
  @IsNotEmpty({ message: 'ID bài viết không được để trống' })
  postId: number;

  @ApiProperty()
  @IsEnum(PostStatus, { message: 'Trạng thái bài viết không hợp lệ' })
  @IsNotEmpty({ message: 'Trạng thái bài viết không được để trống' })
  status: PostStatus;
}

export class AdminApproveRequest {
  @ApiProperty()
  @IsNumber({}, { message: 'ID bài viết phải là một số' })
  @IsNotEmpty({ message: 'ID bài viết không được để trống' })
  postId: number;

  @ApiProperty()
  @IsEnum(AdminAction, { message: 'Hành động không hợp lệ' })
  @IsNotEmpty({ message: 'Hành động không được để trống' })
  action: AdminAction;
}
