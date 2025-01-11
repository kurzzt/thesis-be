import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { TransformResponse } from 'src/interfaces/transform.interface';
import _ from 'lodash';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<TransformResponse> {
    return next.handle().pipe(
      map((response) => {
        const { data, count, meta } = response;

        if (!data?.cache) {
          // const baseEntities: Partial<BaseEntity | BaseEntityWithUUID>[] =
          //   Array.isArray(data) ? data : [data];

          // const resources: Resource[] = [];
          // const included: Resource[] = [];

          // for (const baseEntity of baseEntities) {
          //   const res: Resource = {
          //     ...instanceToInstance(baseEntity),
          //     id: baseEntity?.id?.toString(),
          //     type: baseEntity?.constructor?.name || '',
          //   };

          //   const flattened = flattenData(res);

          //   const parent = simpleMapModelToResource(flattened.pop());
          //   resources.push(parent);

          //   const includes = flattened.map(simpleMapModelToResource);
          //   included.push(...includes);
          // }

          // const unique = _.uniqWith(included, _.isEqual);

          return {
            statusCode: context.switchToHttp().getResponse().statusCode,
            data,
            count,
            meta,
          };
        }

        return {
          data,
          included: data?.included ? _.uniqWith(data?.included, _.isEqual) : [],
          statusCode: context.switchToHttp().getResponse().statusCode,
        };
      }),
    );
  }

  // async fakeQue(time: number): Promise<void> {
  //   await this.delay(time);
  // }

  // delay(time: number) {
  //   return new Promise((resolve) => setTimeout(resolve, time));
  // }
}
