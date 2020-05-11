import Koa from 'koa';
import { RouterContext } from 'koa-router';

export type Context = Koa.Context & RouterContext;
