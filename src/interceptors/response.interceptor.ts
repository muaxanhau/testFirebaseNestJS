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
        const request = context.switchToHttp().getRequest<Request>();

        const response: SuccessResponseBaseModel = {
          statusCode: 200,
          method: request.method,
          path: request.url,
          timestamp: new Date(),
          message: ['Success'],
          data,
        };
        return response;
      }),
    );
  }
}
