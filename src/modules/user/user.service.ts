/* eslint-disable @typescript-eslint/no-var-requires */
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { of } from 'rxjs';
import { vnPayConfig } from 'src/configs/digital-wallet';
import { PostRepository } from 'src/models/repositories/post.repository';
import { TourGuideRepository } from 'src/models/repositories/tourguide.repository';
import { TransactionRepository } from 'src/models/repositories/transaction.repository';
import { UserRepository } from 'src/models/repositories/user.repository';
import {
  BasePaginationRequestDto,
  BasePaginationResponseDto,
} from 'src/shares/dtos/base-pagination.dto';
import { GetTransactionDto } from 'src/shares/dtos/get-transaction.dto';
import { PostStatus } from 'src/shares/enum/post.enum';
import { TourguideStatus } from 'src/shares/enum/tourguide.enum';
import {
  TransactionStatus,
  TransactionType,
} from 'src/shares/enum/transaction.enum';
import { ChangeStatus, UserStatus } from 'src/shares/enum/user.enum';
import { WALLET_TYPE } from 'src/shares/enum/wallet.enum';
import { httpErrors } from 'src/shares/exceptions';
import { httpResponse } from 'src/shares/response';
import { Response } from 'src/shares/response/response.interface';
import { Between, In, Like, Not } from 'typeorm';
import { promisify } from 'util';
import { AdminChangeStatusUserDto } from './dtos/change-user-status.dto';
import { AdminGetUsersDto } from './dtos/get-list-user.dto';
import { TransferDto } from './dtos/transfer.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { CreateConsultationDto } from './dtos/create-consultation.dto';
import { MailService } from '../mail/mail.service';
import { authConfig } from 'src/configs/auth.config';
import * as bcrypt from 'bcryptjs';
import { ChangePasswordDto } from './dtos/change-password.dto';
const getIP = promisify(require('external-ip')());

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly transactionRepository: TransactionRepository,
    private readonly postRepository: PostRepository,
    private readonly tourGuideRepository: TourGuideRepository,
    private mailService: MailService,
  ) {}

  async getUserByIdAndEmail(id: number, email: string) {
    const user = await this.userRepository.findOne({ where: { id, email } });

    if (!user) {
      throw new HttpException(httpErrors.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getUserPost(
    options: BasePaginationRequestDto,
    userId: number,
  ): Promise<Response> {
    const user = await this.userRepository.findOne({
      where: { id: userId, verifyStatus: UserStatus.ACTIVE },
    });
    if (!user) {
      throw new HttpException(httpErrors.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    const posts = await this.postRepository.findAndCount({
      where: { status: In([PostStatus.ACTIVE, PostStatus.WAITING]), user },
      relations: ['userFavorites', 'user', 'comments'],
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

  async getListUser(options: AdminGetUsersDto): Promise<Response> {
    const { keyword, limit, page } = options;
    const users = await this.userRepository.getUsers(keyword, page, limit);
    return {
      ...httpResponse.GET_USER_SUCCESS,
      returnValue: BasePaginationResponseDto.convertToPaginationWithTotalPages(
        users,
        options.page || 1,
        options.limit || 10,
      ),
    };
  }

  async changeUserStatus(body: AdminChangeStatusUserDto): Promise<Response> {
    const { status, userId } = body;
    const user = await this.userRepository.findOne({
      id: userId,
      verifyStatus: Not(UserStatus.INACTIVE),
    });
    if (!user) {
      throw new HttpException(httpErrors.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    // to do send mail
    await this.userRepository.update(
      { id: userId },
      {
        verifyStatus:
          status === ChangeStatus.ACTIVE
            ? UserStatus.ACTIVE
            : UserStatus.LOCKED,
      },
    );
    return httpResponse.CHANGE_USER_STATUS_SUCCESS;
  }

  async deleteUser(userId: number): Promise<Response> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new HttpException(httpErrors.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    await this.userRepository.softDelete(user.id);
    return httpResponse.DELETE_USER_SUCCES;
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

  async genUrlPay(body: TransferDto, userId: number): Promise<Response> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
        verifyStatus: UserStatus.ACTIVE,
      },
    });
    if (!user) {
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
    const expiredDate = moment(date).add(1, 'days').format('YYYYMMDDHHmmss');
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
    vnp_Params['vnp_ExpireDate'] = +expiredDate;
    vnp_Params['vnp_OrderType'] = 'other';
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
      user,
      type: TransactionType.DEPOSIT,
      wallet: WALLET_TYPE.VN_PAY,
    });
    return { ...httpResponse.GEN_LINK_SUCCESS, returnValue: vnpUrl };
  }

  async getUserTransaction(
    options: GetTransactionDto,
    userId: number,
  ): Promise<Response> {
    const { limit, page, startDate, endDate } = options;
    const user = await this.userRepository.findOne({
      where: { id: userId, verifyStatus: UserStatus.ACTIVE },
    });
    if (!user) {
      throw new HttpException(httpErrors.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    const transaction = await this.transactionRepository.findAndCount({
      where: {
        user,
        updatedAt: Between(
          new Date(startDate),
          new Date(moment(endDate).add(1, 'day').toString()),
        ),
      },
      order: {
        id: 'DESC',
      },
    });
    return {
      ...httpResponse.GET_TRANSACTION_SUCCESS,
      returnValue: BasePaginationResponseDto.convertToPaginationWithTotalPages(
        transaction,
        page,
        limit,
      ),
    };
  }

  async IPNUrl(query) {
    const { vnp_Amount, vnp_ResponseCode, vnp_TransactionStatus, vnp_TxnRef } =
      query;
    const secureHash = query['vnp_SecureHash'];
    console.log(query);

    delete query['vnp_SecureHash'];
    delete query['vnp_SecureHashType'];
    query = this.sortObject(query);
    const secretKey = `${vnPayConfig.HASH_SECRET}`;
    const querystring = require('qs');
    const signData = querystring.stringify(query, { encode: true });
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    console.log("==============" + secureHash, signed);
    if (secureHash === signed) {
      const orderId = query['vnp_TxnRef'];
      const rspCode = query['vnp_ResponseCode'];
      //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
      let user, tourGuide;
      const transaction = await this.transactionRepository.findOne({
        where: { transactionCode: orderId },
        relations: ['user', 'tourGuide'],
      });
      const task = [];
      if (transaction.status != TransactionStatus.SUCCESS) {
        if (transaction.user) {
          user = await this.userRepository.findOne({
            where: {
              id: transaction.user.id,
              verifyStatus: UserStatus.ACTIVE,
            },
          });
          task.push(
            this.userRepository.update(
              { id: transaction.user.id },
              {
                balance: user.balance + +vnp_Amount / 100,
                availableBalance: user.availableBalance + +vnp_Amount / 100,
              },
            ),
          );
        } else {
          tourGuide = await this.tourGuideRepository.findOne({
            where: {
              id: transaction.tourGuide.id,
              verifyStatus: TourguideStatus.ACTIVE,
            },
          });
          task.push(
            this.tourGuideRepository.update(
              { id: transaction.tourGuide.id },
              {
                balance: tourGuide.balance + +vnp_Amount / 100,
                availableBalance: tourGuide.availableBalance + +vnp_Amount / 100,
              },
            ),
          );
        }
  
        if (rspCode == '00') {
          await Promise.all([
            this.transactionRepository.update(
              { id: transaction.id },
              {
                status: TransactionStatus.SUCCESS,
              },
            ),
            ...task,
          ]);
        } else {
          await this.transactionRepository.update(
            { id: transaction.id },
            {
              status: TransactionStatus.SUCCESS,
            },
          );
        }
      }

      return httpResponse.DEPOSIT;
    } else {
      console.log({
        hash: secureHash,
        signed,
      });

      console.log('Error');
      return httpResponse.ERROR_DEPOSIT;
    }
  }

  async updateProfile(userId: number, updateProfileDto: UpdateProfileDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId, verifyStatus: UserStatus.ACTIVE },
    });
    if (!user) {
      throw new HttpException(httpErrors.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    
    const { username, phone, avatar } = updateProfileDto;
    if (username) user.username = username;
    if (phone) user.phone = phone;
    if (avatar) user.avatar = avatar;

    await this.userRepository.save(user);

    return httpResponse.UPDATE_PROFILE;
  }

  async sendConsultation(createConsultationDto: CreateConsultationDto) {
    const { tourGuideId, name, phone, email, message } = createConsultationDto;

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

    // Gửi email

    this.mailService.sendConsultationMailToTourGuide({
      name: name,
      phone: phone,
      email: email,
      message: message,
      tourGuideEmail: tourGuide.email,
    })   

    return httpResponse.SEND_CONSULTATION;
  }

  async changePassword(userId: number, changePasswordDto: ChangePasswordDto): Promise<{ message: string }> {
    const { currentPassword, newPassword } = changePasswordDto;
  
    // Lấy thông tin user từ database
    const user = await this.userRepository.findOne({
      where: { id: userId, verifyStatus: UserStatus.ACTIVE },
    });
    if (!user) {
      throw new HttpException(httpErrors.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  
    // Kiểm tra mật khẩu hiện tại
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new HttpException(httpErrors.CURRENT_PASSWORD_IS_INCORRECT, HttpStatus.BAD_REQUEST);
    }
  
    // Mã hóa mật khẩu mới
    const hashedNewPassword = await bcrypt.hash(newPassword, +authConfig.salt);
  
    // Cập nhật mật khẩu
    user.password = hashedNewPassword;
    await this.userRepository.save(user);
  
    return httpResponse.CHANGE_PASSWORD;
  }


  async getOneUser(userId: number): Promise<Response> {
    // Lấy thông tin user từ database
    const user = await this.userRepository.findOne({
      where: { id: userId, verifyStatus: UserStatus.ACTIVE },
    });
    if (!user) {
      throw new HttpException(httpErrors.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    };
    const data = {
      id: user.id,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      verifyStatus: user.verifyStatus,
    };
  
    return {
      ...httpResponse.GET_ONE_USER_SUCCESS,
      returnValue: data,
    };
  }
}
