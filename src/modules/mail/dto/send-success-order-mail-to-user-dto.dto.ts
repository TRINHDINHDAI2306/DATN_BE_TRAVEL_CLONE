import { ActionApproveOrder } from 'src/shares/enum/order.enum';

export class aproveSuccessOrderMailToUserDto {
  email: string;
  userName: string;
  tourName: string;
  startDate: Date;
  numberOfMembers: number;
  tourGuideName: string;
}