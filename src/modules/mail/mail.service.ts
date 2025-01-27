import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from '../auth/dto/register.dto';
import { RegisterEmailDto } from './dto/register-email.dto';
import { ForgotPasswordEmailDto } from './dto/forgot-password-email.dto';
import { ApproveTourEmailDto } from './dto/approve-tour-email.dto';
import { ApproveOrderEmailDto } from './dto/approve-order-email.dto';
import { CreateAdminDto } from './dto/send-create-admin-email.dto';
import { CreateMeetingDto } from './dto/create-meeting-email.dto';
import { aproveSuccessOrderMailToUserDto } from './dto/send-success-order-mail-to-user-dto.dto';
import { aproveSuccessOrderMailToTourGuideDto } from './dto/send-success-order-mail-to-tour-guide-dto.dto';
import { SendConsultationDto } from './dto/send-consultation-dto.dto';

@Injectable()
export class MailService {
  constructor(@InjectQueue('mail') private readonly emailQueue: Queue) {}

  async sendRegisterMail(registerDto: RegisterEmailDto): Promise<void> {
    await this.emailQueue.add('sendRegisterMail', {
      ...registerDto,
    });
  }

  async sendCreateAdmin(createAdminDto: CreateAdminDto): Promise<void> {
    await this.emailQueue.add('sendCreateAdminMail', {
      ...createAdminDto,
    });
  }

  async sendForgotPasswordMail(
    forgotPasswordDto: ForgotPasswordEmailDto,
  ): Promise<void> {
    await this.emailQueue.add('sendForgotPasswordMail', {
      ...forgotPasswordDto,
    });
  }

  async sendApproveTourMail(
    approveTourEmailDto: ApproveTourEmailDto,
  ): Promise<void> {
    await this.emailQueue.add('sendApproveTourMail', {
      ...approveTourEmailDto,
    });
  }

  // async

  async sendAcceptOrderMail(
    aproveOrderEmailDto: ApproveOrderEmailDto,
  ): Promise<void> {
    await this.emailQueue.add('sendAcceptOrderMail', {
      ...aproveOrderEmailDto,
    });
  }
  async sendRejectOrderMail(
    aproveOrderEmailDto: ApproveOrderEmailDto,
  ): Promise<void> {
    await this.emailQueue.add('sendRejectOrderMail', {
      ...aproveOrderEmailDto,
    });
  }

  async sendCreatMeetingMail(body: CreateMeetingDto): Promise<void> {
    await this.emailQueue.add('sendCreatMeetingMail', {
      ...body,
    });
  }

  async sendSuccessOrderMailToUser(
    aproveSuccessOrderMailToUserDto: aproveSuccessOrderMailToUserDto,
  ): Promise<void> {
    await this.emailQueue.add('sendSuccessOrderMailToUser', {
      ...aproveSuccessOrderMailToUserDto,
    });
  }

  async sendSuccessOrderMailToTourGuide(
    aproveSuccessOrderMailToTourGuideDto: aproveSuccessOrderMailToTourGuideDto,
  ): Promise<void> {
    await this.emailQueue.add('sendSuccessOrderMailToTourGuide', {
      ...aproveSuccessOrderMailToTourGuideDto,
    });
  }

  async sendConsultationMailToTourGuide(
    sendConsultationDto: SendConsultationDto,
  ): Promise<void> {
    await this.emailQueue.add('sendConsultationMailToTourGuide', {
      ...sendConsultationDto,
    });
  }

  async sendAcceptTourguideMail(): Promise<void> {}
}
