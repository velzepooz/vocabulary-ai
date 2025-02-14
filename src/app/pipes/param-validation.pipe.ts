import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

/**
 * A validation pipe for route parameters.
 * Implements NestJS PipeTransform to validate incoming route parameters
 * against their class-validator decorators.
 *
 * This pipe:
 * 1. Checks if the parameter is a route param
 * 2. Transforms plain objects to class instances
 * 3. Validates the instance using class-validator
 * 4. Throws BadRequestException with validation errors if validation fails
 * 5. Returns the validated instance
 */
export class ParamValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'param') {
      const valueInstance = plainToInstance(metadata.metatype, value);
      const validationErrors = await validate(valueInstance);
      if (validationErrors.length > 0) {
        throw new BadRequestException(
          validationErrors
            .map((error) => Object.values(error.constraints))
            .flat(),
          'Invalid route param',
        );
      }

      return valueInstance;
    }

    return value;
  }
}
