import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { TransformResponseInterceptor } from './interceptors/transform-response.interceptor';
// import compression from 'compression';
import {
  BadRequestException,
  HttpStatus,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { RequestTimeoutInterceptor } from './interceptors/request-timout.interceptor';
import PrismaExceptionFilter from './filters/prisma-error.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalInterceptors(new TransformResponseInterceptor());
  app.useGlobalInterceptors(new RequestTimeoutInterceptor());
  app.useGlobalFilters(new PrismaExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      // exceptionFactory: (errors) => {
      //   console.log(errors)
      //   const result = errors.map((error) => ({
      //     property: error.property,
      //     message: error.constraints[Object.keys(error.constraints)[0]],
      //   }));
      //   console.error(result);

      //   const message =
      //     errors[0].constraints[Object.keys(errors[0].constraints)[0]];

      //   return new BadRequestException({
      //     message,
      //     code: HttpStatus.BAD_REQUEST,
      //     statusCode: HttpStatus.BAD_REQUEST,
      //   });
      // },
      stopAtFirstError: true,
    }),
  );
  app.enableCors();
  // app.use(compression());
  await app.listen(process.env.PORT);
}
bootstrap();
