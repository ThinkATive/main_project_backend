import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';

// implements : 최소한 안에 있는 함수(catch)는 구현해놔야한다.

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    const status = exception.getStatus();
    const message = exception.message;

    console.log('==============================');
    console.log('예외가 발생했어요!!');
    console.log('예외 내용 : ', message);
    console.log('예외 코드', status);
    console.log('==============================');
  }
}
