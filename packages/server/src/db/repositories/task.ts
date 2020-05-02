import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import { Task } from '../models/task';
import { connect } from '../connection';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {}

let taskRepository: TaskRepository;

export async function getTaskRepository() {
  if (!taskRepository) {
    await connect();
    taskRepository = getCustomRepository(TaskRepository);
  }

  return taskRepository;
}
