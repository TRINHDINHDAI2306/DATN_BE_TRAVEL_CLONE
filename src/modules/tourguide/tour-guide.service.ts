/* eslint-disable @typescript-eslint/no-var-requires */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { vnPayConfig } from 'src/configs/digital-wallet';
import { PostRepository } from 'src/models/repositories/post.repository';
import { TourGuideRepository } from 'src/models/repositories/tourguide.repository';
import { TransactionRepository } from 'src/models/repositories/transaction.repository';
import {
  BasePaginationRequestDto,
  BasePaginationResponseDto,
} from 'src/shares/dtos/base-pagination.dto';
import { GetTransactionDto } from 'src/shares/dtos/get-transaction.dto';
import { OrderStatus } from 'src/shares/enum/order.enum';
import { PostStatus } from 'src/shares/enum/post.enum';
import {
  ActionResponseRegisterTourguide,
  TourguideStatus,
} from 'src/shares/enum/tourguide.enum';
import {
  TransactionStatus,
  TransactionType,
} from 'src/shares/enum/transaction.enum';
import { WALLET_TYPE } from 'src/shares/enum/wallet.enum';
import { httpErrors } from 'src/shares/exceptions';
import { httpResponse } from 'src/shares/response';
import { Response } from 'src/shares/response/response.interface';
import { Between, In } from 'typeorm';
import { promisify } from 'util';
import {
  AdminGetTourGuideDto,
  GetTourGuideDto,
} from './dtos/get-tour-guide.dto';
import { ResponseInterviewTourguideDto } from './dtos/response-interview.dto';
import { ResponseRegisterTourguideDto } from './dtos/response-registation-tourguide.dto';
import { TransferDto } from './dtos/transfer.dto';
import { UpdateTourguideInformationDto } from './dtos/update-infor.dto';
import { UpdateStatusTourGuideDto } from './dtos/update-status-tourguide.dto';
import { UpdateProfileDto } from '../user/dtos/update-profile.dto';
import { ChangePasswordDto } from '../user/dtos/change-password.dto';
import * as bcrypt from 'bcryptjs';
import { authConfig } from 'src/configs/auth.config';

const getIP = promisify(require('external-ip')());

@Injectable()
export class TourGuideService {
  constructor(
    private readonly tourGuideRepository: TourGuideRepository,
    private readonly postRepository: PostRepository,
    private readonly transactionRepository: TransactionRepository,
  ) {}

  // asycn getTourGuide() {

  // };

  async getTourguideByIdUsernameEmail(
    id: number,
    username: string,
    email: string,
  ) {
    const tourGuide = await this.tourGuideRepository.findOne({
      where: {
        id,
        username,
        email,
        verifyStatus: TourguideStatus.ACTIVE,
      },
    });
    if (!tourGuide) {
      throw new HttpException(
        httpErrors.TOUR_GUIDE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    return tourGuide;
  }

  async getTourGuidesByStatusAndKeyword(
    options: AdminGetTourGuideDto,
  ): Promise<Response> {
    const { keyword, status, limit, page } = options;

    const tourGuides =
      await this.tourGuideRepository.getTourGuidesByStatusAndKeyword(
        keyword,
        status,
        page,
        limit,
      );
    return {
      ...httpResponse.GET_TOURGUIDE_SUCCESS,
      returnValue: BasePaginationResponseDto.convertToPaginationWithTotalPages(
        tourGuides,
        options.page || 1,
        options.limit || 10,
      ),
    };
  }

  async responseRegistationTourGuide(
    body: ResponseRegisterTourguideDto,
  ): Promise<Response> {
    const { action, tourGuideId, interviewDate } = body;
    if (action === ActionResponseRegisterTourguide.ACCEPT && !interviewDate) {
      throw new HttpException(
        httpErrors.INTERVIEW_DATE_NOT_VALID,
        HttpStatus.BAD_REQUEST,
      );
    }
    const tourGuide = await this.tourGuideRepository.findOne({
      where: {
        id: tourGuideId,
        verifyStatus: TourguideStatus.PENDING,
      },
    });
    if (!tourGuide) {
      throw new HttpException(
        httpErrors.TOUR_GUIDE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    await Promise.all([
      this.tourGuideRepository.update(tourGuideId, {
        verifyStatus:
          action === ActionResponseRegisterTourguide.ACCEPT
            ? TourguideStatus.WAITING_INTERVIEW
            : TourguideStatus.REJECT,
        interviewDate: ActionResponseRegisterTourguide.ACCEPT
          ? interviewDate
          : null,
      }),
      // todo
      // this.mailService.
    ]);
    return httpResponse.RESPONSE_SUCCESS;
  }

  async responseInterview(
    body: ResponseInterviewTourguideDto,
  ): Promise<Response> {
    const { action, tourGuideId } = body;

    const tourGuide = await this.tourGuideRepository.findOne({
      where: {
        id: tourGuideId,
        verifyStatus: TourguideStatus.WAITING_INTERVIEW,
      },
    });
    if (!tourGuide) {
      throw new HttpException(
        httpErrors.TOUR_GUIDE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    await Promise.all([
      this.tourGuideRepository.update(tourGuideId, {
        verifyStatus:
          action === ActionResponseRegisterTourguide.ACCEPT
            ? TourguideStatus.ACTIVE
            : TourguideStatus.REJECT,
      }),
      // todo
      // this.mailService.
    ]);
    return httpResponse.RESPONSE_SUCCESS;
  }

  async getTourGuide(option: GetTourGuideDto): Promise<Response> {
    const data = await this.tourGuideRepository.getTourGuides(option);
    return {
      returnValue: data,
      ...httpResponse.GET_TOURGUIDE_SUCCESS,
    };
  }

  async getOneTourGuide(tourGuideId: number): Promise<Response> {
    const tourGuide = await this.tourGuideRepository.findOne({
      where: {
        id: tourGuideId,
        verifyStatus: TourguideStatus.ACTIVE,
      },
      relations: [
        'tours',
        'tours.images',
        'tours.rates',
        'provinces',
        'userFavorites',
        'orders',
        'posts',
      ],
    });
    if (!tourGuide) {
      throw new HttpException(
        httpErrors.TOUR_GUIDE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    const avgStar = await this.tourGuideRepository.getAvgStar(tourGuideId);
    const numberOfOrder = tourGuide.orders.filter((order) => {
      order.status === OrderStatus.DONE;
    }).length;
    return {
      ...httpResponse.GET_TOURGUIDE_SUCCESS,
      returnValue: { ...tourGuide, ...avgStar, numberOfOrder },
    };
  }

  async updateStatusTourGuide(
    body: UpdateStatusTourGuideDto,
  ): Promise<Response> {
    const { tourGuideId, status } = body;
    if (![TourguideStatus.ACTIVE, TourguideStatus.INACTIVE].includes(status)) {
      throw new HttpException(
        httpErrors.INVALID_STATUS,
        HttpStatus.BAD_REQUEST,
      );
    }
    const tourGuide = await this.tourGuideRepository.findOne({
      where: {
        id: tourGuideId,
      },
      relations: ['orders'],
    });
    // TODO: neus tourguide có tour chưa trả tiền thì hủy và ,,,
    if (!tourGuide) {
      throw new HttpException(
        httpErrors.TOUR_GUIDE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    const tourGuideOrders = tourGuide.orders.filter((order) => {
      if (
        [
          OrderStatus.PROCESSING,
          OrderStatus.WAITING_PREPAID,
          OrderStatus.WAITING_PURCHASE,
          OrderStatus.WAITING_START,
          OrderStatus.WAITING_TOUR_GUIDE,
        ].includes(order.status)
      ) {
        return order;
      }
    });
    if (tourGuideOrders.length > 0) {
      throw new HttpException(
        httpErrors.TOURGUIDE_HAS_ORDER,
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.tourGuideRepository.update(
      { id: tourGuideId },
      {
        verifyStatus: status,
      },
    );
    return httpResponse.UPDATE_STATUS_TOURGUIDE_SUCCESS;
  }

  async deleteTourGuide(tourGuideId: number): Promise<Response> {
    const tourGuide = await this.tourGuideRepository.findOne({
      where: {
        id: tourGuideId,
      },
      relations: ['orders'],
    });
    // TODO: neus tourguide có tour chưa trả tiền thì hủy và ,,,
    if (!tourGuide) {
      throw new HttpException(
        httpErrors.TOUR_GUIDE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    const tourGuideOrders = tourGuide.orders.filter((order) => {
      if (
        [
          OrderStatus.PROCESSING,
          OrderStatus.WAITING_PREPAID,
          OrderStatus.WAITING_PURCHASE,
          OrderStatus.WAITING_START,
          OrderStatus.WAITING_TOUR_GUIDE,
        ].includes(order.status)
      ) {
        return order;
      }
    });
    if (tourGuideOrders.length > 0) {
      throw new HttpException(
        httpErrors.TOURGUIDE_HAS_ORDER,
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.tourGuideRepository.softDelete(tourGuide.id);
    return httpResponse.UPDATE_STATUS_TOURGUIDE_SUCCESS;
  }

  async getAllTourGuide() {
    return this.tourGuideRepository.find();
  }

  async getTourGuidePost(
    options: BasePaginationRequestDto,
    tourGuideId: number,
  ): Promise<Response> {
    const tourGuide = await this.tourGuideRepository.findOne({
      where: { id: tourGuideId, verifyStatus: TourguideStatus.ACTIVE },
    });
    if (!tourGuide) {
      throw new HttpException(httpErrors.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    const posts = await this.postRepository.findAndCount({
      where: {
        status: In([PostStatus.ACTIVE, PostStatus.WAITING]),
        tourGuide,
      },
      relations: ['userFavorites', 'tourGuide', 'comments'],
      take: options.limit,
      skip: (options.page - 1) * options.limit,
    });

    return {
      ...httpResponse.GET_POST_SUCCESS,
      returnValue: BasePaginationResponseDto.convertToPaginationWithTotalPages(
        posts,
        options.page || 1,
        options.limit || 10,
      ),
    };
  }

  sortObject(obj) {
    const sorted = {};
    const keys = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        keys.push(key);
      }
    }

    keys.sort();
    const keysLength = keys.length;
    for (let i = 0; i < keysLength; i++) {
      sorted[keys[i]] = obj[keys[i]];
    }

    return sorted;
  }

  async genUrlPay(body: TransferDto, tourGuideId: number): Promise<Response> {
    const tourGuide = await this.tourGuideRepository.findOne({
      where: {
        id: tourGuideId,
        verifyStatus: TourguideStatus.ACTIVE,
      },
    });
    if (!tourGuide) {
      throw new HttpException(httpErrors.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    const ipAddr = await getIP();
    const tmnCode = `${vnPayConfig.TMN_CODE}`;
    const secretKey = `${vnPayConfig.HASH_SECRET}`;
    let vnpUrl = vnPayConfig.URL;
    const returnUrl =
      body.fromWeb && body.fromWeb === true
        ? vnPayConfig.RETURN_URL_WEB
        : vnPayConfig.RETURN_URL_MOBILE;
    const date = new Date();
    const createDate = moment(date).format('YYYYMMDDHHmmss');
    const orderId = moment(date).format('DDHHmmss');
    const amount = body.amount;
    const bankCode = 'NCB';
    const orderInfo = `${orderId}`;
    const locale = 'vn';
    const currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = +createDate;
    // if (bankCode !== null && bankCode !== '') {
    // vnp_Params['vnp_BankCode'] = bankCode;
    // vnp_Params['vnp_ExpireDate'] = expiredDate;
    // }
    vnp_Params = this.sortObject(vnp_Params);
    const querystring = require('qs');
    const signData = querystring.stringify(vnp_Params, { encode: true });
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: true });
    await this.transactionRepository.insert({
      status: TransactionStatus.VNPAY_PENDING,
      amount,
      transactionCode: orderId,
      time: date,
      tourGuide,
      type: TransactionType.DEPOSIT,
      wallet: WALLET_TYPE.VN_PAY,
    });
    return { ...httpResponse.GEN_LINK_SUCCESS, returnValue: vnpUrl };
  }

  async getTourguideTransaction(
    options: GetTransactionDto,
    tourGuideId: number,
  ): Promise<Response> {
    const { limit, page, startDate, endDate } = options;
    const startDateDb = new Date(startDate);
    const endDateDb = new Date(moment(endDate).add(1, 'day').toString());
    const tourguide = await this.tourGuideRepository.findOne({
      where: { id: tourGuideId, verifyStatus: TourguideStatus.ACTIVE },
    });
    if (!tourguide) {
      throw new HttpException(
        httpErrors.TOUR_GUIDE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    const transaction = await this.transactionRepository.findAndCount({
      where: {
        tourGuide: tourguide,
        updatedAt: Between(
          new Date(startDate),
          new Date(moment(endDate).add(1, 'day').toString()),
        ),
      },
      order: {
        id: 'DESC',
      },
    });
    const [amountTimeRange, amountAllTime] = await Promise.all([
      this.transactionRepository
        .createQueryBuilder('transaction')
        .select('SUM(transaction.amount)', 'totalAmountRange')
        .where('transaction.status = :status', {
          status: TransactionStatus.SUCCESS,
        })
        .andWhere('transaction.updatedAt >= :startDate', {
          startDate: startDateDb,
        })
        .andWhere('transaction.updatedAt <= :endDate', { endDate: endDateDb })
        .andWhere('transaction.type = :type', {
          type: TransactionType.TOURGUIDE_RECEIVE_ORDER,
        })
        .andWhere('transaction.tourGuide = :tourGuideId', { tourGuideId })
        .getRawOne(),
      this.transactionRepository
        .createQueryBuilder('transaction')
        .select('SUM(transaction.amount)', 'totalAmount')
        .where('transaction.status = :status', {
          status: TransactionStatus.SUCCESS,
        })
        .andWhere('transaction.updatedAt <= :endDate', { endDate: endDateDb })
        .andWhere('transaction.type = :type', {
          type: TransactionType.TOURGUIDE_RECEIVE_ORDER,
        })
        .andWhere('transaction.tourGuide = :tourGuideId', { tourGuideId })
        .getRawOne(),
    ]);
    console.log(amountTimeRange);

    return {
      ...httpResponse.GET_TRANSACTION_SUCCESS,
      returnValue: BasePaginationResponseDto.convertToPaginationWithTotalPages(
        transaction,
        page,
        limit,
      ),
      options: {
        totalProfitTimeRange: amountTimeRange.totalAmountRange
          ? parseFloat(amountTimeRange.totalAmountRange)
          : 0,
        totalProfit: amountAllTime.totalAmount
          ? parseFloat(amountAllTime.totalAmount)
          : 0,
      },
    };
  }

  async updateInformation(
    tourGuideId: number,
    body: UpdateTourguideInformationDto,
  ): Promise<Response> {
    const tourGuide = await this.tourGuideRepository.findOne({
      where: {
        id: tourGuideId,
        verifyStatus: TourguideStatus.ACTIVE,
      },
    });
    if (!tourGuide) {
      throw new HttpException(
        httpErrors.TOUR_GUIDE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.tourGuideRepository.update({ id: tourGuide.id }, { ...body });
    return httpResponse.UPDATE_STATUS_TOURGUIDE_SUCCESS;
  }

  async updateProfile(userId: number, updateProfileDto: UpdateProfileDto) {
    const tourGuide = await this.tourGuideRepository.findOne({
      where: { id: userId, verifyStatus: TourguideStatus.ACTIVE },
    });
    if (!tourGuide) {
      throw new HttpException(
        httpErrors.TOUR_GUIDE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    
    const { username, phone, avatar } = updateProfileDto;
    if (username) tourGuide.username = username;
    if (phone) tourGuide.phone = phone;
    if (avatar) tourGuide.avatar = avatar;

    await this.tourGuideRepository.save(tourGuide);

    return httpResponse.UPDATE_PROFILE;
  }

  async changePassword(userId: number, changePasswordDto: ChangePasswordDto): Promise<{ message: string }> {
    const { currentPassword, newPassword } = changePasswordDto;
  
    // Lấy thông tin user từ database
    const tourGuide = await this.tourGuideRepository.findOne({
      where: { id: userId, verifyStatus: TourguideStatus.ACTIVE },
    });
    if (!tourGuide) {
      throw new HttpException(
        httpErrors.TOUR_GUIDE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
  
    // Kiểm tra mật khẩu hiện tại
    const isPasswordValid = await bcrypt.compare(currentPassword, tourGuide.password);
    if (!isPasswordValid) {
      throw new HttpException(httpErrors.CURRENT_PASSWORD_IS_INCORRECT, HttpStatus.BAD_REQUEST);
    }
  
    // Mã hóa mật khẩu mới
    const hashedNewPassword = await bcrypt.hash(newPassword, +authConfig.salt);
  
    // Cập nhật mật khẩu
    tourGuide.password = hashedNewPassword;
    await this.tourGuideRepository.save(tourGuide);
  
    return httpResponse.CHANGE_PASSWORD;
  }
}
