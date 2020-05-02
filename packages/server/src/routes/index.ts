import Router from 'koa-router';
import { todoRouter } from './todo-router';

const router = new Router();

router.use('/_api', todoRouter.routes(), todoRouter.allowedMethods());

export default router;
