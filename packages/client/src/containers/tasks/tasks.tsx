import * as React from 'react';
import TasksList from '../../components/tasks-list';

const Tasks: React.FC = () => {
  const tasks = [
    { title: 'First task', id: 1 },
    { title: 'Second task', id: 2 },
  ];
  return (
    <div>
      <TasksList tasks={tasks}></TasksList>
    </div>
  );
};

export default Tasks;
