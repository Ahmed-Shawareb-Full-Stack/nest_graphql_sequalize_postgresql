import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class CustomValidation implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
      
    }

    const toValidateObject = plainToClass(metatype, value);
    const errors = await validate(toValidateObject);

    if (errors.length > 0) {
      const errorMessage = this.errorMessageFormatter(errors);
      throw new BadRequestException(errorMessage);
    }

    return value;
  }

  private toValidate(metatype: Function) {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private errorMessageFormatter(errors) {
    return errors.map((error) => {
      const constraints = error.constraints;
      const constraintsKeys = Object.keys(constraints);
      const key = constraintsKeys[0];
      const errorMessage = constraints[key];

      return {
        message: errorMessage,
        errorCode: key,
        property: error.property,
      };
    });
  }
}
