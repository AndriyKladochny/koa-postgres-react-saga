import Joi from '@hapi/joi';
import Koa from 'koa';
import { Context } from '../types';
import { DataValidationError } from '../errors';

export function validate(schema: Joi.Schema) {
  return (ctx: Context, next: Koa.Next) => {
    const valResult = schema.validate(ctx, {
      abortEarly: false,
    });

    if (valResult.error) {
      throw new DataValidationError(valResult.error.message);
    }

    return next();
  };
}
