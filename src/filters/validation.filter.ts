import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  HttpException,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { ValidationError } from 'class-validator';

// export const validationExceptionFactory = (errors: ValidationError[]) => {
//   const errMsg = {};
//   errors.forEach((error: ValidationError) => {
//     errMsg[error.property] = [...Object.values(error.constraints)];
//   });
//   return new ValidationException(errMsg);
// };

export const validationExceptionFactory = (errors: ValidationError[]) => {
  const formatError = (errors: ValidationError[]) => {
    const errMsg = {};
    errors.forEach((error: ValidationError) => {
      errMsg[error.property] = error.children.length
        ? [formatError(error.children)]
        : [...Object.values(error.constraints)];
    });
    return errMsg;
  };
  return new ValidationException(formatError(errors));
};

export class ValidationException extends BadRequestException {
  constructor(public validationErrors: Record<string, unknown>) {
    super(validationErrors);
  }
}

@Catch()
export class QglValidationException implements GqlExceptionFilter {
  // constructor(public validationErrors: Record<string, unknown>) {
  //   console.log(validationErrors);
  //   console.log('first');
  // }
  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const response = gqlHost.switchToHttp().getResponse();
    console.log('test', exception);
    return exception;
  }
}

/**
@Catch(HttpException)
export class GraphQLErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlExecutionContext.create(host);
    const ctx = gqlHost.getContext();
    const response = ctx.res;
    const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    const errorResponse = exception.getResponse() as any;
    const errors = errorResponse.message || errorResponse.error || errorResponse;
    response.status(status).json({
      statusCode: status,
      message: 'Validation failed',
      errors: this.formatErrors(errors),
    });
  }
 */
