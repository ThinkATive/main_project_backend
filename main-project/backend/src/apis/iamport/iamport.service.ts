import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { Order } from '../orders/entities/order.entity';

@Injectable()
export class IamportService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getToken() {
    // 액세스 토큰(access token) 발급 받기
    const getToken = await axios({
      url: 'https://api.iamport.kr/users/getToken',
      method: 'post', // POST method
      headers: { 'Content-Type': 'application/json' }, // "Content-Type": "application/json"
      data: {
        imp_key: process.env.IMP_KEY, // REST API 키
        imp_secret: process.env.IMP_SECRET, // REST API Secret
      },
    });
    return getToken.data.response.access_token; // 인증 토큰
  }

  async getPaymentInfo({ impUid, myToken }) {
    // imp_uid로 아임포트 서버에서 결제 정보 조회
    const getPaymentData = await axios({
      url: `https://api.iamport.kr/payments/${impUid}`, // imp_uid 전달
      method: 'get', // GET method
      headers: { Authorization: myToken }, // 인증 토큰 Authorization header에 추가
    });
    return getPaymentData.data.response; // 조회한 결제 정보
  }

  async cancelPayment({ myToken, reason, impUid: imp_uid, cancelableAmount }) {
    const getCancelData = await axios({
      url: 'https://api.iamport.kr/payments/cancel',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: myToken, // 아임포트 서버로부터 발급받은 엑세스 토큰
      },
      data: {
        reason, // 가맹점 클라이언트로부터 받은 환불사유
        imp_uid, // imp_uid를 환불 `unique key`로 입력
        checksum: cancelableAmount, // [권장] 환불 가능 금액 입력
      },
    });
    const { response } = getCancelData.data; // 환불 결과

    return response;
  }
}
