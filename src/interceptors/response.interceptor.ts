import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { SuccessResponseBaseModel } from 'src/models';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();

        const result: SuccessResponseBaseModel = {
          statusCode: 200,
          method: request.method,
          path: request.url,
          timestamp: new Date(),
          message: ['Success'],
          data,
        };
        return result;
      }),
    );
  }
}
