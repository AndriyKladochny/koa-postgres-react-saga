import React, { useState, useEffect } from 'react';
import TasksList from '../../components/tasks-list';
import { taskApi } from '../../api';
import { ITask } from '../../interfaces/task';

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    async function fetchData() {
      const tasks = await taskApi.getTasks();
      setTasks(tasks);
    }
    fetchData();
  }, []);

  return (
    <div>
      <TasksList tasks={tasks}></TasksList>
    </div>
  );
};

export default Tasks;
