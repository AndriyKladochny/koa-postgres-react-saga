import Koa from 'koa';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { getTaskRepository } from '../../db/repositories/task';
import { RouterContext } from 'koa-router';
import { Task } from '../../db/models/task';
import { NotFoundError } from '../../errors';

export async function getTasks(ctx: Koa.Context) {
  const taskRepository = await getTaskRepository();
  const tasks = await taskRepository.find();
  ctx.body = tasks;
  ctx.res.statusCode = 200;
}

export async function getTask(
  ctx: Koa.Context & RouterContext,
  next: Koa.Next
) {
  const taskRepository = await getTaskRepository();
  const id = ctx.params.id; // TODO: find the way to typing params
  const task = await taskRepository.findOne(id);
  if (task) {
    ctx.body = task;
    ctx.res.statusCode = 200;
    return next();
  }

  ctx.res.statusCode = 404;
}

export async function addTask(
  ctx: Koa.Context & RouterContext,
  next: Koa.Next
) {
  const taskRepository = await getTaskRepository();
  try {
    let taskData: Partial<Task> = ctx.request.body;
    const task = await taskRepository.save(taskData);
    ctx.body = task;
    ctx.res.statusCode = 201;
    return next();
  } catch {
    ctx.body = 'Adding new task error';
    ctx.res.statusCode = 500;
  }
}

export async function updateTask(
  ctx: Koa.Context & RouterContext,
  next: Koa.Next
) {
  const taskRepository = await getTaskRepository();
  try {
    let updateData: Partial<Task> = ctx.request.body;
    const id = ctx.params.id; // TODO: find the way to typing params
    let task = await taskRepository.findOneOrFail(id);
    console.log(task);
    task = { ...task, ...updateData };
    task = await taskRepository.save(task);
    ctx.body = task;
    ctx.res.statusCode = 200;
    return next();
  } catch (error) {
    if (error instanceof EntityNotFoundError) {
      ctx.body = error.message;
      ctx.res.statusCode = 404;
    } else {
      ctx.body = 'Updating task error';
      ctx.res.statusCode = 500;
    }
  }
}

export async function deleteTask(
  ctx: Koa.Context & RouterContext,
  next: Koa.Next
) {
  const taskRepository = await getTaskRepository();
  try {
    const id = ctx.params.id; // TODO: find the way to typing params
    const deleteResult = await taskRepository.delete(id);
    if (!deleteResult.affected) {
      throw new NotFoundError('Task not found');
    }
    ctx.res.statusCode = 200;
    return next();
  } catch (error) {
    if (error instanceof NotFoundError) {
      ctx.body = error.message;
      ctx.res.statusCode = 404;
    } else {
      ctx.body = 'Deleting task error';
      ctx.res.statusCode = 500;
    }
  }
}
