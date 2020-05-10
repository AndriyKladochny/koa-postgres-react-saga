import supertest from 'supertest';
import { app } from '../../../../src/app';
import { connect } from '../../../../src/db/connection';
import {
  getTaskRepository,
  TaskRepository,
} from '../../../../src/db/repositories/task';

const server = app.listen();
const request = supertest(server);
let taskRepository: TaskRepository;

beforeAll(async () => {
  taskRepository = await getTaskRepository();
});

beforeEach(async () => {
  await taskRepository.clear();
});

afterAll(async () => {
  server.close();
  await (await connect()).close();
});

describe('Todo API', () => {
  describe('GET /_api/todo', () => {
    test('should return a list of tasks', async () => {
      const tasks = [{ title: 'First task' }, { title: 'Second task' }];

      await taskRepository.insert(tasks);

      const res = await request.get('/_api/todo').expect(200);

      expect(res.body).toHaveLength(2);
      expect(res.body[0].title).toEqual(tasks[0].title);
      expect(res.body[1].title).toEqual(tasks[1].title);
    });
  });

  describe('GET /_api/todo/:id', () => {
    test('should return a single task', async () => {
      const taskData = { title: 'Write integration tests' };

      const task = await taskRepository.save(taskData);

      const res = await request.get(`/_api/todo/${task.id}`).expect(200);

      expect(res.body.title).toEqual(taskData.title);
    });

    test(`should return 404 when task doesn't exist`, async () => {
      await request.get(`/_api/todo/0`).expect(404);
    });
  });

  describe('POST /_api/todo', () => {
    test('should add a new task and return it', async () => {
      const taskData = { title: 'Write integration tests' };

      const res = await request.post(`/_api/todo`).send(taskData).expect(201);

      expect(res.body.title).toEqual(taskData.title);
    });

    test('should return 400 error when title is missed', async () => {
      const taskData = {};

      const res = await request.post(`/_api/todo`).send(taskData).expect(400);
      // Why error is not in body?
      expect(res.text).toEqual('Title is required');
    });

    test('should return 500 error when saving to DB throws error', async () => {
      const taskData = { title: 'Write integration tests' };
      jest.spyOn(taskRepository, 'save').mockRejectedValueOnce('Custom error');
      const res = await request.post(`/_api/todo`).send(taskData).expect(500);
      // Why error is not in body?
      expect(res.text).toEqual('Adding new task error');
    });
  });

  describe('PATCH /_api/todo/:id', () => {
    test('should update task title', async () => {
      const task = await taskRepository.save({
        title: 'Write integration tests',
      });
      const updatedTitle = 'Write integration tests UPD';
      const res = await request
        .patch(`/_api/todo/${task.id}`)
        .send({ title: updatedTitle })
        .expect(200);

      expect(res.body.title).toEqual(updatedTitle);
    });

    test(`should return 404 when we are updating not existed task`, async () => {
      const updatedTitle = 'Write integration tests UPD';
      await request
        .patch(`/_api/todo/0`)
        .send({ title: updatedTitle })
        .expect(404);
    });

    test('should return 500 error when saving to DB throws error', async () => {
      const task = await taskRepository.save({
        title: 'Write integration tests',
      });

      jest.spyOn(taskRepository, 'save').mockRejectedValueOnce('Custom error');

      const updatedTitle = 'Write integration tests UPD';

      const res = await request
        .patch(`/_api/todo/${task.id}`)
        .send({ title: updatedTitle })
        .expect(500);

      // Why error is not in body?
      expect(res.text).toEqual('Updating task error');
    });
  });

  describe('DELETE /_api/todo/:id', () => {
    test('should delete a task', async () => {
      const taskData = { title: 'Write integration tests' };

      const task = await taskRepository.save(taskData);

      await request.delete(`/_api/todo/${task.id}`).expect(204);

      await request.get(`/_api/todo/${task.id}`).expect(404);
    });

    test(`should return 404 when task doesn't exist`, async () => {
      await request.delete(`/_api/todo/0`).expect(404);
    });

    test('should return 500 error when DB delete throws error', async () => {
      const taskData = { title: 'Write integration tests' };

      const task = await taskRepository.save(taskData);

      jest
        .spyOn(taskRepository, 'delete')
        .mockRejectedValueOnce('Custom error');
      const res = await request.delete(`/_api/todo/${task.id}`).expect(500);
      // Why error is not in body?
      expect(res.text).toEqual('Deleting task error');
    });
  });
});
