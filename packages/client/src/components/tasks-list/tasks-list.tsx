import { FC } from 'react';
import * as React from 'react';
import { ITask } from '../../interfaces/task';

const TasksList: FC<{ tasks: Array<ITask> }> = ({ tasks }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul>
  );
};

export default TasksList;
