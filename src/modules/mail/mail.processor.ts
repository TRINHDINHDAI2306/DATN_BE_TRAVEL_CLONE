import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { emailConfig } from 'src/configs/email.config';
import { RegisterEmailDto } from './dto/register-email.dto';
import { ForgotPasswordEmailDto } from './dto/forgot-password-email.dto';
import { ApproveOrderEmailDto } from './dto/approve-order-email.dto';
import { ActionApproveOrder } from 'src/shares/enum/order.enum';
import { CreateAdminDto } from './dto/send-create-admin-email.dto';
import { CreateMeetingDto } from './dto/create-meeting-email.dto';
import { aproveSuccessOrderMailToUserDto } from './dto/send-success-order-mail-to-user-dto.dto';
import { aproveSuccessOrderMailToTourGuideDto } from './dto/send-success-order-mail-to-tour-guide-dto.dto';
//import * as moment from 'moment';

@Processor('mail')
export class MailProcessor {
  //   public static MAIL_BANNER_LINK = `${getConfig().get<string>('mail.domain')}banner.png`;

  constructor(
    private readonly mailerService: MailerService,
    private readonly logger: Logger,
  ) {}

  @Process('sendRegisterMail')
  async sendRegisterMail({ data }: Job<RegisterEmailDto>): Promise<number> {
    this.logger.log(
      `Start job: sendUpdateEmail user ${data.username} email ${data.email}`,
    );
    const context = {
      email: data.email,
      token: data.token,
      username: data.username,
    };
    try {
      await this.mailerService.sendMail({
        from: emailConfig.from,
        to: data.email,
        subject: `Xác nhận đăng ký KLearnIt`,
        template: `src/modules/mail/templates/register.template.hbs`,
        context: context,
      });
    } catch (e) {
      this.logger.debug(e);
    }
    this.logger.log(
      `Done job: sendUpdateEmail ${data.email} email ${data.username}`,
    );
    return 1;
  }

  @Process('sendCreateAdminMail')
  async sendCreateAdminMail({ data }: Job<CreateAdminDto>): Promise<number> {
    this.logger.log(
      `Start job: sendCreateAdminMail user ${data.username} email ${data.email}`,
    );
    const context = {
      email: data.email,
      url: data.url,
      username: data.username,
    };
    try {
      await this.mailerService.sendMail({
        from: emailConfig.from,
        to: data.email,
        subject: `Tạo mật khẩu quản trị Ktravel`,
        template: `src/modules/mail/templates/create-admin.template.hbs`,
        context: context,
      });
    } catch (e) {
      this.logger.debug(e);
    }
    this.logger.log(
      `Done job: sendUpdateEmail ${data.email} email ${data.username}`,
    );
    return 1;
  }

  @Process('sendForgotPasswordMail')
  async sendForgotPasswordMail({
    data,
  }: Job<ForgotPasswordEmailDto>): Promise<number> {
    this.logger.log(
      `Start job: sendUpdateEmail user ${data.username} email ${data.email}`,
    );
    const context = {
      email: data.email,
      token: data.token,
      username: data.username,
    };
    try {
      await this.mailerService.sendMail({
        from: emailConfig.from,
        to: data.email,
        subject: `Xác nhận quên mật khẩu KLearnIt`,
        template: `src/modules/mail/templates/forgot-password.template.hbs`,
        context: context,
      });
    } catch (e) {
      this.logger.debug(e);
    }
    this.logger.log(
      `Done job: sendUpdateEmail ${data.email} email ${data.username}`,
    );
    return 1;
  }

  @Process('sendAcceptOrderMail')
  async sendAcceptOrderMail({
    data,
  }: Job<ApproveOrderEmailDto>): Promise<number> {
    this.logger.log(
      `Start job: sendAcceptOrderMail user ${data.username} email ${data.email}`,
    );
    const context = {
      email: data.email,
      tourGuideName: data.tourGuideName,
    };
    try {
      await this.mailerService.sendMail({
        from: emailConfig.from,
        to: data.email,
        subject: `Hướng dẫn viên đã xác nhận Order của bạn.`,
        template: `src/modules/mail/templates/accept-order.template.hbs`,
        context: context,
      });
    } catch (e) {
      this.logger.debug(e);
    }
    this.logger.log(
      `Done job: sendAcceptOrderMail ${data.email} email ${data.username}`,
    );
    return 1;
  }
  @Process('sendRejectOrderMail')
  async sendRejectOrderMail({
    data,
  }: Job<ApproveOrderEmailDto>): Promise<number> {
    this.logger.log(
      `Start job: sendRejectOrderMail user ${data.username} email ${data.email}`,
    );
    const context = {
      email: data.email,
      tourGuideName: data.tourGuideName,
    };
    try {
      await this.mailerService.sendMail({
        from: emailConfig.from,
        to: data.email,
        subject: `Order của bạn đã bị từ chối.`,
        template: `src/modules/mail/templates/reject-order.template.hbs`,
        context: context,
      });
    } catch (e) {
      this.logger.debug(e);
    }
    this.logger.log(
      `Done job: sendRejectOrderMail ${data.email} email ${data.username}`,
    );
    return 1;
  }

  @Process('sendCreatMeetingMail')
  async sendCreatMeetingMail({ data }: Job<CreateMeetingDto>): Promise<number> {
    this.logger.log(
      `Start job: sendCreatMeetingMail user ${data.name} email ${data.email}`,
    );
    const context = {
      email: data.email,
      name: data.name,
      date: data.date,
      username: data.username,
      content: data.content,
      tourName: data.tourName,
    };
    try {
      await this.mailerService.sendMail({
        from: emailConfig.from,
        to: data.email,
        subject: `Báo cáo người dùng về chuyến đi`,
        template: `src/modules/mail/templates/create-meeting.template.hbs`,
        context: context,
      });
    } catch (e) {
      this.logger.debug(e);
    }
    this.logger.log(
      `Done job: sendCreatMeetingMail ${data.email} email ${data.username}`,
    );
    return 1;
  }

  // @Process('sendApproveTourMail')
  // async sendApproveTourMail() {}

  @Process('sendSuccessOrderMailToUser')
  async sendSuccessOrderMailToUser({
    data,
  }: Job<aproveSuccessOrderMailToUserDto>): Promise<number> {
    this.logger.log(
      `Start job: sendSuccessOrderMailToUser user ${data.userName} email ${data.email}`,
    );
    const context = {
      email: data.email,
      userName: data.userName,
      tourName: data.tourName,
      startDate: data.startDate,
      numberOfMembers: data.numberOfMembers,
      tourGuideName: data.tourGuideName,
    };

    try {
      await this.mailerService.sendMail({
        from: emailConfig.from,
        to: data.email,
        subject: `Xác nhận đặt tour thành công.`,
        template: `src/modules/mail/templates/send-success-order-mail-to-user.template.hbs`,
        context: context,
      });
    } catch (e) {
      this.logger.debug(e);
    }
    this.logger.log(
      `Done job: sendSuccessOrderMailToUser ${data.email} email ${data.userName}`,
    );
    return 1;
  }

  @Process('sendSuccessOrderMailToTourGuide')
  async sendSuccessOrderMailToTourGuide({
    data,
  }: Job<aproveSuccessOrderMailToTourGuideDto>): Promise<number> {
    this.logger.log(
      `Start job: sendSuccessOrderMailToTourGuide user ${data.userName} email ${data.email}`,
    );
    const context = {
      email: data.email,
      userName: data.userName,
      tourName: data.tourName,
      startDate: data.startDate,
      numberOfMembers: data.numberOfMembers,
      tourGuideName: data.tourGuideName,
    };

    try {
      await this.mailerService.sendMail({
        from: emailConfig.from,
        to: data.email,
        subject: `Thông báo đơn đặt tour mới.`,
        template: `src/modules/mail/templates/send-success-order-mail-to-tour-guide.template.hbs`,
        context: context,
      });
    } catch (e) {
      this.logger.debug(e);
    }
    this.logger.log(
      `Done job: sendSuccessOrderMailToTourGuide ${data.email} email ${data.userName}`,
    );
    return 1;
  }
}
