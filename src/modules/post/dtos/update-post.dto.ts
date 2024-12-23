import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Topics } from 'src/shares/enum/post.enum';
// import { AdminAction } from 'src/shares/enum/post.enum';

export class UpdateBlogDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  postId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsEnum(Topics)
  @IsNotEmpty()
  topic: Topics;

  @ApiProperty()
  @IsString()
  @IsOptional()
  image: string;
}

// export class AdminApproveRequest {
//   @ApiProperty()
//   @IsNumber()
//   @IsNotEmpty()
//   postId: number;

//   @ApiProperty()
//   @IsEnum(AdminAction)
//   @IsNotEmpty()
//   action: AdminAction;
// }
