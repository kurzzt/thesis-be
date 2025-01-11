import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  RequestTimeoutException,
} from '@nestjs/common';
import {
  Observable,
  TimeoutError,
  catchError,
  throwError,
  timeout,
} from 'rxjs';
import { TIME_OUT } from '../decorators/settimeout.decorator';

@Injectable()
export class RequestTimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const timeOutMetadata = Reflect.getMetadata(TIME_OUT, context.getHandler());
    const timeoutValue = timeOutMetadata || 5000; // Default timeout is 5 seconds (5000 milliseconds)

    return next.handle().pipe(
      timeout(timeoutValue),
      catchError((error) => {
        if (error instanceof TimeoutError) {
          return throwError(new RequestTimeoutException('Request Timeout'));
        }
        return throwError(error);
      }),
    );
  }
}
