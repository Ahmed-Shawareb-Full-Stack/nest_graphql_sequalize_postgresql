import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  I18nMiddleware,
  I18nValidationExceptionFilter,
  I18nValidationPipe,
} from 'nestjs-i18n';
import { ValidationPipe } from '@nestjs/common';
import {
  QglValidationException,
  validationExceptionFactory,
} from './filters/validation.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(I18nMiddleware);
  // app.useGlobalPipes(new ValidationPipe({
  //   exceptionFactory :
  // }));
  // app.useGlobalFilters(new ValidateException());
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      // exceptionFactory: validationExceptionFactory,
    }),
  );
  app.useGlobalFilters(new QglValidationException());
  await app.listen(3000);
}
bootstrap();
