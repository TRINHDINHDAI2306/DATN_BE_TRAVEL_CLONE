export const httpResponse = {
  REGISTER_SEND_MAIL: {
    message: 'Vui lòng kiểm tra email để xác nhận đăng ký',
    code: 'USER_001',
    statusCode: 200,
  },
  REGISTER_SUCCESS: {
    message: 'Đăng ký thành công',
    code: 'USER_002',
    statusCode: 200,
  },
  LOGIN_SUCCESS: {
    message: 'Đăng nhập thành công',
    code: 'USER_003',
    statusCode: 200,
  },
  FORGOT_PASSWORD_SUCCESS: {
    message: 'Đổi mật khẩu thành công',
    code: 'USER_004',
    statusCode: 200,
  },
  GEN_LINK_SUCCESS: {
    message: 'Tạo liên kết thành công',
    code: 'Gen success',
    statusCode: 200,
  },
  // TOUR
  CREATE_TOUR_SUCCESS: {
    message: 'Tour đã được tạo, vui lòng chờ quản trị viên duyệt',
    code: 'TOUR_001',
    statusCode: 200,
  },
  UPDATE_TOUR_SUCCESS: {
    message: 'Tour đã được chỉnh sửa',
    code: 'TOUR_001',
    statusCode: 200,
  },
  DELETE_TOUR_SUCCESS: {
    message: 'Tour đã được xóa',
    code: 'TOUR_001',
    statusCode: 200,
  },
  APPROVE_TOUR_SUCCESS: {
    message: 'Tour đã được kích hoạt',
    code: 'TOUR_002',
    statusCode: 200,
  },
  GET_TOUR_SUCCESS: {
    message: 'Lấy thông tin tour thành công',
    code: 'TOUR_002',
    statusCode: 200,
  },
  // PROVINCE
  GET_PROVINCE_SUCCESS: {
    message: 'Lấy thông tin tỉnh thành thành công',
    code: 'TOUR_002',
    statusCode: 200,
  },
  // VOUCHER
  CREATE_VOUCHER_SUCCESS: {
    message: 'Tạo voucher thành công',
    code: 'VOUCHER_001',
    statusCode: 200,
  },

  CLAIM_VOUCHER_SUCCESS: {
    message: 'Nhận voucher thành công',
    code: 'VOUCHER_002',
    statusCode: 200,
  },

  GET_VOUCHER_SUCCESS: {
    message: 'Lấy thông tin voucher thành công',
    code: 'VOUCHER_003',
    statusCode: 200,
  },

  // TOUR GUIDE
  GET_TOURGUIDE_SUCCESS: {
    message: 'Lấy thông tin hướng dẫn viên thành công',
    code: 'TOUR_GUIDE_001',
    statusCode: 200,
  },
  GET_USER_SUCCESS: {
    message: 'Lấy thông tin người dùng thành công',
    code: 'TOUR_GUIDE_001',
    statusCode: 200,
  },
  RESPONSE_SUCCESS: {
    message: 'Phản hồi thành công',
    code: 'TOUR_GUIDE_002',
    statusCode: 200,
  },
  UPDATE_STATUS_TOURGUIDE_SUCCESS: {
    message: 'Cập nhật trạng thái thành công',
    code: 'TOUR_GUIDE_003',
    statusCode: 200,
  },

  // POST

  // ORDER
  GET_ORDER_SUCCESS: {
    message: 'Lấy danh sách đơn hàng thành công',
    code: 'ORDER_001',
    statusCode: 200,
  },
  APPROVE_ORDER_SUCCESS: {
    message: 'Duyệt đơn hàng thành công',
    code: 'ORDER_002',
    statusCode: 200,
  },
  PAID_ORDER_SUCCESS: {
    message: 'Thanh toán đơn hàng thành công',
    code: 'ORDER_003',
    statusCode: 200,
  },
  START_ORDER_SUCCESS: {
    message: 'Bắt đầu đơn hàng thành công',
    code: 'ORDER_004',
    statusCode: 200,
  },
  CANCEL_ORDER_SUCCESS: {
    message: 'Hủy đơn hàng thành công',
    code: 'ORDER_005',
    statusCode: 200,
  },
  END_ORDER_SUCCESS: {
    message: 'Kết thúc đơn hàng thành công',
    code: 'ORDER_006',
    statusCode: 200,
  },
  PREPAID_ORDER_SUCCESS: {
    message: 'Thanh toán trước thành công',
    code: 'ORDER_007',
    statusCode: 200,
  },
  RATE_ORDER_SUCCESS: {
    message: 'Đánh giá đơn hàng thành công',
    code: 'ORDER_008',
    statusCode: 200,
  },
  // GET ME
  GET_ME_SUCCESS: {
    message: 'Lấy thông tin thành công',
    code: 'ME_001',
    statusCode: 200,
  },
  // ADMIN
  CREATE_ADMIN_SUCCESS: {
    message: 'Tạo quản trị viên thành công',
    code: 'ADMIN_001',
    statusCode: 200,
  },
  ACTIVE_ADMIN_SUCCESS: {
    message: 'Kích hoạt quản trị viên thành công',
    code: 'ADMIN_002',
    statusCode: 200,
  },
  GET_ADMIN_SUCCESS: {
    message: 'Lấy thông tin quản trị viên thành công',
    code: 'ADMIN_003',
    statusCode: 200,
  },
  CHANGE_STATUS_MOD_SUCCESS: {
    message: 'Thay đổi trạng thái quản trị viên thành công',
    code: 'ADMIN_004',
    statusCode: 200,
  },
  DELETE_MOD_SUCCESS: {
    message: 'Xóa quản trị viên thành công',
    code: 'ADMIN_005',
    statusCode: 200,
  },
  // USER
  CHANGE_USER_STATUS_SUCCESS: {
    message: 'Thay đổi trạng thái người dùng thành công',
    code: 'USER_001',
    statusCode: 200,
  },
  GET_ONE_USER_SUCCESS: {
    message: 'Lấy thông tin người dùng thành công',
    code: 'USER_002',
    statusCode: 200,
  },
  DELETE_USER_SUCCES: {
    message: 'Xóa người dùng thành công',
    code: 'USER_003',
    statusCode: 200,
  },
  // POST
  CREATE_POST_SUCCESS: {
    message: 'Tạo bài đăng thành công',
    code: 'POST_001',
    statusCode: 200,
  },
  APPROVE_POST_SUCCESS: {
    message: 'Phê duyệt bài đăng thành công',
    code: 'POST_002',
    statusCode: 200,
  },
  REQUEST_UPDATE_POST_SUCCESS: {
    message: 'Yêu cầu cập nhật bài đăng thành công',
    code: 'POST_003',
    statusCode: 200,
  },
  UPDATE_POST_SUCCESS: {
    message: 'Cập nhật bài đăng thành công',
    code: 'POST_004',
    statusCode: 200,
  },
  GET_POST_SUCCESS: {
    message: 'Lấy thông tin bài đăng thành công',
    code: 'POST_005',
    statusCode: 200,
  },
  DELETE_POST_SUCCESS: {
    message: 'Xóa bài đăng thành công',
    code: 'POST_006',
    statusCode: 200,
  },
  // REQUEST
  CREATE_REQUEST_SUCCESS: {
    message: 'Tạo yêu cầu thành công',
    code: 'REQUEST_001',
    statusCode: 200,
  },

  GET_REQUEST_SUCCESS: {
    message: 'Lấy thông tin yêu cầu thành công',
    code: 'REQUEST_002',
    statusCode: 200,
  },

  DELETE_REQUEST_SUCCESS: {
    message: 'Xóa yêu cầu thành công',
    code: 'REQUEST_003',
    statusCode: 200,
  },

  ///
  CREATE_COMMENT_SUCCESS: {
    message: 'Tạo bình luận thành công',
    code: 'COMMENT_001',
    statusCode: 200,
  },

  GET_COMMENT_SUCCESS: {
    message: 'Lấy bình luận thành công',
    code: 'COMMENT_002',
    statusCode: 200,
  },

  UPDATE_COMMENT_SUCCESS: {
    message: 'Cập nhật bình luận thành công',
    code: 'COMMENT_003',
    statusCode: 200,
  },

  DELETE_COMMENT_SUCCESS: {
    message: 'Xóa bình luận thành công',
    code: 'COMMENT_004',
    statusCode: 200,
  },
  // GET TRANSACTION SUCCESS
  GET_TRANSACTION_SUCCESS: {
    message: 'Lấy giao dịch thành công',
    code: 'TRANSACTION_001',
    statusCode: 200,
  },
  CREATE_TRANSACTION_SUCCESS: {
    message: 'Tạo giao dịch thành công',
    code: 'TRANSACTION_002',
    statusCode: 200,
  },
  // REPORT
  CREATE_REPORT_SUCCESS: {
    message: 'Tạo báo cáo thành công',
    code: 'REPORT_001',
    statusCode: 200,
  },
  GET_REPORT_SUCCESS: {
    message: 'Lấy báo cáo thành công',
    code: 'REPORT_002',
    statusCode: 200,
  },
  DELETE_REPORT_SUCCESS: {
    message: 'Xóa báo cáo thành công',
    code: 'REPORT_003',
    statusCode: 200,
  },
  HANLED_REPORT: {
    message: 'Xử lý báo cáo thành công',
    code: 'REPORT_004',
    statusCode: 200,
  },
  CREATING_MEETING_REPORT: {
    message: 'Tạo cuộc họp thành công',
    code: 'REPORT_005',
    statusCode: 200,
  },
  CHANGE_PASSWORD: {
    message: 'Đổi mật khẩu thành công',
    code: 'PASSWORD_CHANGE_001',
    statusCode: 200,
  },
  SEND_CONSULTATION: {
    message: 'Yêu cầu tư vấn đã được gửi đến hướng dẫn viên',
    code: 'SEND_CONSULTATION_001',
    statusCode: 200,
  },
  UPDATE_PROFILE: {
    message: 'Cập nhật hồ sơ thành công',
    code: 'UPDATE_PROFILE_001',
    statusCode: 200,
  },
  DEPOSIT: {
    message: 'Nạp tiền thành công',
    code: 'DEPOSIT_001',
    statusCode: 200,
  },
  ERROR_DEPOSIT: {
    message: 'Nạp tiền thất bại',
    code: 'DEPOSIT_002',
    statusCode: 400,
  },
};
