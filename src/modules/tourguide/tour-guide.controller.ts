import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ActorID } from 'src/shares/decorators/get-user-id.decorator';
import { BasePaginationRequestDto } from 'src/shares/dtos/base-pagination.dto';
import { GetTransactionDto } from 'src/shares/dtos/get-transaction.dto';
import { Response } from 'src/shares/response/response.interface';
import { AdminModAuthGuard } from '../auth/guards/admin-mod-auth.guard';
import { TourGuideAuthGuard } from '../auth/guards/tour-guide-auth.guard';
import {
  AdminGetTourGuideDto,
  GetTourGuideDto,
} from './dtos/get-tour-guide.dto';
import { ResponseInterviewTourguideDto } from './dtos/response-interview.dto';
import { ResponseRegisterTourguideDto } from './dtos/response-registation-tourguide.dto';
import { TransferDto } from './dtos/transfer.dto';
import { UpdateTourguideInformationDto } from './dtos/update-infor.dto';
import { UpdateStatusTourGuideDto } from './dtos/update-status-tourguide.dto';
import { TourGuideService } from './tour-guide.service';
import { UpdateProfileDto } from '../user/dtos/update-profile.dto';
import { ChangePasswordDto } from '../user/dtos/change-password.dto';

@Controller('tour-guide')
@ApiTags('Tour Guide')
@ApiBearerAuth()
export class TourGuideController {
  constructor(private readonly tourGuideService: TourGuideService) {}

  // @Post('/')
  // // HDV tạo
  // async createTour(@Body() body: CreateTourDto): Promise<Response> {
  //   return this.tourService.createTour(body);
  // }
  @Get('/post')
  @UseGuards(TourGuideAuthGuard)
  async getTourGuidePost(
    @Query() options: BasePaginationRequestDto,
    @ActorID() tourGuideId: number,
  ): Promise<Response> {
    return this.tourGuideService.getTourGuidePost(options, tourGuideId);
  }

  @Get('/admin')
  @UseGuards(AdminModAuthGuard)
  async getTourGuideByStatus(
    @Query() options: AdminGetTourGuideDto,
  ): Promise<Response> {
    return this.tourGuideService.getTourGuidesByStatusAndKeyword(options);
  }

  @Put('/')
  @UseGuards(AdminModAuthGuard)
  async updateTourguideStatus(
    @Body() body: UpdateStatusTourGuideDto,
  ): Promise<Response> {
    return this.tourGuideService.updateStatusTourGuide(body);
  }

  @Delete('/:id')
  @UseGuards(AdminModAuthGuard)
  async deleteTourguide(@Param('id') id: number): Promise<Response> {
    return this.tourGuideService.deleteTourGuide(id);
  }

  @Put('/response-registation')
  @UseGuards(AdminModAuthGuard)
  async responseRegistationRequest(
    @Body() body: ResponseRegisterTourguideDto,
  ): Promise<Response> {
    return this.tourGuideService.responseRegistationTourGuide(body);
  }

  @Put('/response-interview')
  @UseGuards(AdminModAuthGuard)
  async responseInterview(
    @Body() body: ResponseInterviewTourguideDto,
  ): Promise<Response> {
    return this.tourGuideService.responseInterview(body);
  }

  @Put('/infor')
  @UseGuards(TourGuideAuthGuard)
  async updateInfor(
    @Body() body: UpdateTourguideInformationDto,
    @ActorID() tourGuideId: number,
  ): Promise<Response> {
    return this.tourGuideService.updateInformation(tourGuideId, body);
  }

  @Get('/')
  async getTourGuide(@Query() options: GetTourGuideDto): Promise<Response> {
    return this.tourGuideService.getTourGuide(options);
  }

  @Get('/guest/:id')
  async getOneTourGuide(@Param('id') id: number): Promise<Response> {
    return this.tourGuideService.getOneTourGuide(id);
  }

  @Post('/deposit')
  @UseGuards(TourGuideAuthGuard)
  async genUrlPay(
    @Body() body: TransferDto,
    @ActorID() userId: number,
  ): Promise<Response> {
    return this.tourGuideService.genUrlPay(body, userId);
  }

  @Get('/transaction')
  @UseGuards(TourGuideAuthGuard)
  async getTransaction(
    @Query() options: GetTransactionDto,
    @ActorID() tourGuideId: number,
  ): Promise<Response> {
    return this.tourGuideService.getTourguideTransaction(options, tourGuideId);
  }

  @Put('/profile')
  @UseGuards(TourGuideAuthGuard)
  async updateProfile(
    @Body() updateProfileDto: UpdateProfileDto,
    @ActorID() userId: number,
  ) {
    return this.tourGuideService.updateProfile(userId, updateProfileDto);
  }

  @Put('/change-password')
  @UseGuards(TourGuideAuthGuard)
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @ActorID() userId: number,
  ): Promise<{ message: string }> {
    return this.tourGuideService.changePassword(userId, changePasswordDto);
  }
}
