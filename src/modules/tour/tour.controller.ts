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
import { Response } from 'src/shares/response/response.interface';
import { AdminModAuthGuard } from '../auth/guards/admin-mod-auth.guard';
import { TourGuideAuthGuard } from '../auth/guards/tour-guide-auth.guard';
import { ApproveTourDto } from './dtos/approve-tour.dto';
import { CreateTourDto } from './dtos/create-tour.dto';
import { GetTourDto } from './dtos/get-tour-dto';
import { TourService } from './tour.service';
import { GetTourWithTourGuideDto } from './dtos/get-tour-with-tour-guide.dto';

@Controller('tours')
@ApiTags('Tour')
@ApiBearerAuth()
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Post('/')
  @UseGuards(TourGuideAuthGuard)
  async createTour(
    @Body() body: CreateTourDto,
    @ActorID() tourGuideId: number,
  ): Promise<Response> {
    return this.tourService.createTour(body, tourGuideId);
  }

  // @Put('/active')
  // @UseGuards()

  @Post('/:id')
  @UseGuards(TourGuideAuthGuard)
  async editTour(
    @Param('id') tourId: number,
    @Body() body: CreateTourDto,
    @ActorID() tourGuideId: number,
  ): Promise<Response> {
    return this.tourService.editTour(tourId, body, tourGuideId);
  }

  @Delete('/:id')
  @UseGuards(TourGuideAuthGuard)
  async deleteTour(
    @Param('id') tourId: number,
  ): Promise<Response> {
    return this.tourService.deleteTour(tourId);
  }

  @Get('/')
  async getTour(@Query() options: GetTourDto): Promise<Response> {
    return this.tourService.getTours(options);
  }

  @Get('/tour-guide')
  @UseGuards(TourGuideAuthGuard)
  async getToursWithTourGuide(
    @Query() options: GetTourWithTourGuideDto,
    @ActorID() tourGuideId: number,
  ): Promise<Response> {
    return this.tourService.getToursWithTourGuide(options, tourGuideId);
  }

  @Get('/:id')
  async getOneTour(@Param('id') id: number) {
    return this.tourService.getTour(id);
  }
  @Get('/tour-guide/:id')
  @UseGuards(TourGuideAuthGuard)
  async getTourWithTourGuide(
    @Param('id') id: number,
    @ActorID() tourGuideId: number,
  ) {
    return this.tourService.getTourWithTourGuide(id, tourGuideId);
  }

  @Get('/admin/approve-list')
  @UseGuards(AdminModAuthGuard)
  async getApproveList(@Query() options: GetTourDto): Promise<Response> {
    return this.tourService.getApproveList(options);
  }

  @Put('/')
  @UseGuards(AdminModAuthGuard)
  async approveTour(@Body() body: ApproveTourDto): Promise<Response> {
    return this.tourService.approveTour(body);
  }
}
