import Koa from 'koa';
import { Context } from '../types';
import { AppError } from '../errors';

export async function errorHandler(ctx: Context, next: Koa.Next) {
  try {
    await next();
  } catch (error) {
    if (error instanceof AppError) {
      ctx.body = error.message;
      ctx.status = error.code;
    } else {
      ctx.message = 'Internal Server Error';
      ctx.status = 500;
    }
  }
}
