import Router from 'koa-router';
import * as taskController from '../controllers/task';

const todoRouter = new Router();

todoRouter.get('/todo', taskController.getTasks);

todoRouter.get('/todo/:id', taskController.getTask);

todoRouter.post('/todo', taskController.addTask);

todoRouter.patch('/todo/:id', taskController.updateTask);

todoRouter.delete('/todo/:id', taskController.deleteTask);

export { todoRouter };
