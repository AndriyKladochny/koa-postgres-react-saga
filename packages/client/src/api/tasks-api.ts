import axios from 'axios';
import { ITask } from '../interfaces/task';

export async function getTasks(): Promise<ITask[]> {
  const result = await axios.get<ITask[]>('/_api/todo');
  return result.data;
}
