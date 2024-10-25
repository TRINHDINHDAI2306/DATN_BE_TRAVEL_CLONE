export enum TransactionStatus {
  SUCCESS = '1',
  FAILED = '0',
  VNPAY_PENDING = '2',
  WAITING = '3',
}

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
  USER_PAY_ORDER = 'PAY_ORDER',
  USER_PREPAID_ORDER = 'USER_PREPAID_ORDER',
  TOURGUIDE_APPROVE_ORDER = 'TOURGUIDE_APPROVE_ORDER',
  TOURGUIDE_RECEIVE_ORDER = 'TOURGUIDE_RECEIVE_ORDER',
  CANCEL_ORDER = 'CANCEL_ORDER',
  BACK_PREPAID = 'BACK_PREPAID',
  BACK_ORDER = 'BACK_ORDER',
  PROFIT_SYSTEM = 'PROFIT_SYSTEM',
}

export enum AproveActionWithdraw {
  ACCEPT = 'ACCEPT',
  REJECT = 'REJECT',
}
