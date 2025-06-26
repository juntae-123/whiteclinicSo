import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, map } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((res) => {
        const { message, ...data } = res;
        return {
          success: true,
          message: message || '요청이 성공적으로 처리되었습니다.',
          statusCode: response.statusCode,
          data,
        };
      }),
    );
  }
}
