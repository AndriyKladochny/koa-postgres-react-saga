import Koa from 'koa';
import { Context } from '../types';
import { AppError } from '../errors';

export async function errorHandler(ctx: Context, next: Koa.Next) {
  try {
    await next();
  } catch (error) {
    if (error instanceof AppError) {
      ctx.body = { message: error.message };
      ctx.status = error.code;
    } else {
      ctx.body = { message: 'Internal Server Error' };
      ctx.status = 500;
    }
  }
}
