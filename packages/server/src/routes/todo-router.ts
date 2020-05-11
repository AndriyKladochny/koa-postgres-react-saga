import Router from 'koa-router';
import * as taskController from '../controllers/task';
import { validate } from '../middlewares';
import { addTaskSchema, updateTaskSchema } from '../validation/task';

const todoRouter = new Router();

todoRouter.get('/todo', taskController.getTasks);

todoRouter.get('/todo/:id', taskController.getTask);

todoRouter.post('/todo', validate(addTaskSchema), taskController.addTask);

todoRouter.patch(
  '/todo/:id',
  validate(updateTaskSchema),
  taskController.updateTask
);

todoRouter.delete('/todo/:id', taskController.deleteTask);

export { todoRouter };
