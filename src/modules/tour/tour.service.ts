import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProvinceRepository } from 'src/models/repositories/province.repository';
import { TourImageRepository } from 'src/models/repositories/tour-image.repository';
import { TourScheduleRepository } from 'src/models/repositories/tour-schedule.repository';
import { TourRepository } from 'src/models/repositories/tour.repository';
import { OrderRepository } from 'src/models/repositories/order.repository';
import { TourGuideRepository } from 'src/models/repositories/tourguide.repository';
import { BasePaginationResponseDto } from 'src/shares/dtos/base-pagination.dto';
import {
  AdminApproveAction,
  TourStatus,
  TourTypes,
} from 'src/shares/enum/tour.enum';
import { TourguideStatus } from 'src/shares/enum/tourguide.enum';
import { httpErrors } from 'src/shares/exceptions';
import { httpResponse } from 'src/shares/response';
import { Response } from 'src/shares/response/response.interface';
import { Between, In, LessThanOrEqual, MoreThanOrEqual, Not } from 'typeorm';
import { ApproveTourDto } from './dtos/approve-tour.dto';
import { CreateTourDto } from './dtos/create-tour.dto';
import { GetTourDto } from './dtos/get-tour-dto';
import { GetTourWithTourGuideDto } from './dtos/get-tour-with-tour-guide.dto';

@Injectable()
export class TourService {
  constructor(
    private readonly tourRepository: TourRepository,
    private readonly orderRepository: OrderRepository,
    private readonly tourScheduleRepository: TourScheduleRepository,
    private readonly tourImageRepository: TourImageRepository,
    private readonly tourGuideRepository: TourGuideRepository,
    private readonly provinceRepository: ProvinceRepository,
  ) {}

  async createTour(
    body: CreateTourDto,
    tourGuideId: number,
  ): Promise<Response> {
    const { name, description, basePrice, provinceId, overview, maxMember, feePerMember} = body;
    const [tour, tourGuide, province] = await Promise.all([
      this.tourRepository.findOne({
        where: { name },
      }),
      this.tourGuideRepository.findOne({ where: { id: tourGuideId } }),
      this.provinceRepository.findOne(provinceId),
    ]);
    if (tour) {
      throw new HttpException(httpErrors.TOUR_EXIST, HttpStatus.FOUND);
    }
    if (!tourGuide) {
      throw new HttpException(
        httpErrors.TOUR_GUIDE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!province) {
      throw new HttpException(
        httpErrors.PROVINCE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const [tourSchedulesData, imagesData] = await Promise.all([
      this.tourScheduleRepository.save([...body.tourSchedules]),
      this.tourImageRepository.save([...body.tourImages]),
    ]);

    await this.tourRepository.save({
      name,
      description,
      basePrice,
      tourGuide,
      images: imagesData,
      tourSchedule: tourSchedulesData,
      status: TourStatus.WAITING,
      province,
      overview,
      tour,
      maxMember,
      feePerMember
    });
    return httpResponse.CREATE_TOUR_SUCCESS;
  }

  async editTour(
    tourId: number,
    body: CreateTourDto,
    tourGuideId: number,
  ): Promise<Response> {
    const { name, description, basePrice, provinceId, overview, maxMember, feePerMember} = body;
  
    const tour = await this.tourRepository.findOne({
      where: { id: tourId, tourGuide: { id: tourGuideId } },
      relations: ['tourGuide', 'province', 'images', 'tourSchedule'],
    });
  
    if (!tour) {
      throw new HttpException(httpErrors.TOUR_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  
    if (name && name !== tour.name) {
      const existingTour = await this.tourRepository.findOne({ where: { name } });
      if (existingTour) {
        throw new HttpException(httpErrors.TOUR_EXIST, HttpStatus.CONFLICT);
      }
    }
  
    let province = null;
    if (provinceId) {
      province = await this.provinceRepository.findOne({ where: { id: provinceId } });
      if (!province) {
        throw new HttpException(httpErrors.PROVINCE_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    }
  
    if (body.tourSchedules) {
      await this.tourScheduleRepository.delete({ tour: { id: tourId } });
  
      const newSchedules = await this.tourScheduleRepository.save([
        ...body.tourSchedules.map((schedule) => ({
          ...schedule,
          content: schedule.content,
          tour,
        })),
      ]);
      tour.tourSchedule = newSchedules;
    }
  
    if (body.tourImages) {
      await this.tourImageRepository.delete({ tour: { id: tourId } });
  

      const newImages = await this.tourImageRepository.save([
        ...body.tourImages.map((image) => ({
          url: image.url,
          tour,
        })),
      ]);
      tour.images = newImages;
    }
  
    tour.name = name || tour.name;
    tour.description = description || tour.description;
    tour.basePrice = basePrice || tour.basePrice;
    tour.province = province || tour.province;
    tour.overview = overview || tour.overview;
    tour.maxMember = maxMember ||tour.maxMember;
    tour.feePerMember = feePerMember ||tour.feePerMember;
  
    await this.tourRepository.save(tour);
  
    return httpResponse.UPDATE_TOUR_SUCCESS;
  }

  async deleteTour(tourId: number): Promise<Response> {
    const tour = await this.tourRepository.findOne({
      where: { id: tourId },
      relations: ['tourSchedule', 'images'],
    });

    if (!tour) {
      throw new HttpException(httpErrors.TOUR_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const orderExists = await this.orderRepository.findOne({
      where: { tour: { id: tourId } },
    });

    if (orderExists) {
      throw new HttpException(httpErrors.CAN_NOT_DELETE, HttpStatus.FORBIDDEN);
    }

    if (tour.tourSchedule && tour.tourSchedule.length > 0) {
      await this.tourScheduleRepository.remove(tour.tourSchedule);
    }

    if (tour.images && tour.images.length > 0) {
      await this.tourImageRepository.remove(tour.images);
    }
    await this.tourRepository.remove(tour);

    return httpResponse.DELETE_TOUR_SUCCESS;
  } 

  async getTours(options: GetTourDto): Promise<Response> {
    // const tours = await this.tourRepository.fin
    const { provinceId, tourGuideId, minPrice, maxPrice, types } = options;
    const tourTypesArray = types
      ?.replace(/\s/g, '')
      .split(',')
      .filter((e) => (Object.values(TourTypes) as string[]).includes(e));

    const where = {};
    let province, tourGuide;
    if (provinceId) {
      province = await this.provinceRepository.findOne({
        where: { id: provinceId },
      });
      where[`province`] = province;
    }
    if (tourGuideId) {
      tourGuide = await this.tourGuideRepository.findOne({
        where: { id: tourGuideId, verifyStatus: TourguideStatus.ACTIVE },
      });
      where[`tourGuide`] = tourGuide;
    }
    if (minPrice && maxPrice) {
      where[`basePrice`] = Between(minPrice, maxPrice);
    }
    if (minPrice && !maxPrice) {
      where[`basePrice`] = MoreThanOrEqual(minPrice);
    }
    if (!minPrice && maxPrice) {
      where[`basePrice`] = LessThanOrEqual(maxPrice);
    }

    if (tourTypesArray && tourTypesArray.length > 0) {
      where[`type`] = In(tourTypesArray);
    }
    const data = await this.tourRepository.findAndCount({
      where: {
        ...where,
        status: TourStatus.ACTIVE,
      },
      relations: [
        'images',
        'rates',
        'tourGuide',
        'userFavorites',
        'tourSchedule',
        'province',
      ],
      take: options.limit,
      skip: (options.page - 1) * options.limit,
    });
    return {
      returnValue: BasePaginationResponseDto.convertToPaginationWithTotalPages(
        data,
        options.page || 1,
        options.limit || 10,
      ),
      ...httpResponse.GET_TOUR_SUCCESS,
    };
  }
  async getToursWithTourGuide(options: GetTourWithTourGuideDto, tourGuideId): Promise<Response> {
    // const tours = await this.tourRepository.fin
    const { provinceId, minPrice, maxPrice, types } = options;
    const tourTypesArray = types
      ?.replace(/\s/g, '')
      .split(',')
      .filter((e) => (Object.values(TourTypes) as string[]).includes(e));

    const where = {};
    let province, tourGuide;
    if (provinceId) {
      province = await this.provinceRepository.findOne({
        where: { id: provinceId },
      });
      where[`province`] = province;
    }
    if (tourGuideId) {
      tourGuide = await this.tourGuideRepository.findOne({
        where: { id: tourGuideId, verifyStatus: TourguideStatus.ACTIVE },
      });
      where[`tourGuide`] = tourGuide;
    }
    if (minPrice && maxPrice) {
      where[`basePrice`] = Between(minPrice, maxPrice);
    }
    if (minPrice && !maxPrice) {
      where[`basePrice`] = MoreThanOrEqual(minPrice);
    }
    if (!minPrice && maxPrice) {
      where[`basePrice`] = LessThanOrEqual(maxPrice);
    }

    if (tourTypesArray && tourTypesArray.length > 0) {
      where[`type`] = In(tourTypesArray);
    }
    const data = await this.tourRepository.findAndCount({
      where: {
        ...where
      },
      relations: [
        'images',
        'rates',
        'tourGuide',
        'userFavorites',
        'tourSchedule',
        'province',
      ],
      take: options.limit,
      skip: (options.page - 1) * options.limit,
    });
    return {
      returnValue: BasePaginationResponseDto.convertToPaginationWithTotalPages(
        data,
        options.page || 1,
        options.limit || 10,
      ),
      ...httpResponse.GET_TOUR_SUCCESS,
    };
  }

  async getTour(id: number): Promise<Response> {
    const tour = await this.tourRepository.findOne({
      where: {
        id,
        status: TourStatus.ACTIVE,
        tourGuide: { verifyStatus: TourguideStatus.ACTIVE },
      },
      relations: [
        'images',
        'rates',
        'tourGuide',
        'userFavorites',
        'tourSchedule',
        'province',
      ],
    });
    if (!tour) {
      throw new HttpException(httpErrors.TOUR_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return {
      ...httpResponse.GET_PROVINCE_SUCCESS,
      returnValue: tour,
    };
  }

  async getTourWithTourGuide(id: number, tourGuideId): Promise<Response> {
    const tour = await this.tourRepository.findOne({
      where: {
        id,
        tourGuide: {id: tourGuideId, verifyStatus: TourguideStatus.ACTIVE },
      },
      relations: [
        'images',
        'rates',
        'tourGuide',
        'userFavorites',
        'tourSchedule',
        'province',
      ],
    });
    if (!tour) {
      throw new HttpException(httpErrors.TOUR_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return {
      ...httpResponse.GET_PROVINCE_SUCCESS,
      returnValue: tour,
    };
  }

  async getApproveList(options: GetTourDto) {
    const data = await this.tourRepository.findAndCount({
      where: {
        status: TourStatus.WAITING,
      },
      relations: ['images', 'rates', 'tourGuide', 'tourSchedule', 'province'],
      order: {
        id: 'DESC',
      },
      take: options.limit,
      skip: (options.page - 1) * options.limit,
    });
    return {
      ...httpResponse.GET_TOUR_SUCCESS,
      returnValue: BasePaginationResponseDto.convertToPaginationWithTotalPages(
        data,
        options.page || 1,
        options.limit || 10,
      ),
    };
  }

  async approveTour(body: ApproveTourDto): Promise<Response> {
    const { tourId, action } = body;
    const tour = await this.tourRepository.findOne({
      where: {
        id: tourId,
        status: TourStatus.WAITING,
      },
      relations: ['tourGuide'],
    });
    if (!tour) {
      throw new HttpException(httpErrors.TOUR_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    if (tour.tourGuide.verifyStatus !== TourguideStatus.ACTIVE) {
      throw new HttpException(
        httpErrors.TOUR_GUIDE_NOT_ACTIVE,
        HttpStatus.BAD_REQUEST,
      );
    }
    let status: TourStatus;
    switch (action) {
      case AdminApproveAction.APPROVE:
        status = TourStatus.ACTIVE;
        break;
      case AdminApproveAction.REJECT:
        status = TourStatus.REJECTED;
        break;
      default:
        break;
    }
    await this.tourRepository.update(tourId, {
      status,
    });
    return httpResponse.CREATE_TOUR_SUCCESS;
  }
}
