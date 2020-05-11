import Koa from 'koa';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { getTaskRepository } from '../../db/repositories/task';
import { Task } from '../../db/models/task';
import { NotFoundError } from '../../errors';
import { Context } from '../../types';

export async function getTasks(ctx: Koa.Context) {
  const taskRepository = await getTaskRepository();
  const tasks = await taskRepository.find();
  ctx.body = tasks;
  ctx.status = 200;
}

export async function getTask(ctx: Context, next: Koa.Next) {
  const taskRepository = await getTaskRepository();
  const id = ctx.params.id; // TODO: find the way to typing params
  const task = await taskRepository.findOne(id);
  if (task) {
    ctx.body = task;
    ctx.status = 200;
    return next();
  } else {
    throw new NotFoundError('Task not found');
  }
}

export async function addTask(ctx: Context, next: Koa.Next) {
  const taskRepository = await getTaskRepository();
  const task = await taskRepository.save(ctx.request.body);
  ctx.body = task;
  ctx.status = 201;
  return next();
}

export async function updateTask(ctx: Context, next: Koa.Next) {
  const taskRepository = await getTaskRepository();
  try {
    let updateData: Partial<Task> = ctx.request.body;
    const id = ctx.params.id; // TODO: find the way to typing params
    let task = await taskRepository.findOneOrFail(id);
    task = { ...task, ...updateData };
    task = await taskRepository.save(task);
    ctx.body = task;
    ctx.status = 200;
    return next();
  } catch (error) {
    if (error instanceof EntityNotFoundError) {
      throw new NotFoundError('Task not found');
    } else {
      throw error;
    }
  }
}

export async function deleteTask(ctx: Context, next: Koa.Next) {
  const taskRepository = await getTaskRepository();

  const id = ctx.params.id; // TODO: find the way to typing params
  const deleteResult = await taskRepository.delete(id);
  if (!deleteResult.affected) {
    throw new NotFoundError('Task not found');
  }
  ctx.status = 204;
  return next();
}
