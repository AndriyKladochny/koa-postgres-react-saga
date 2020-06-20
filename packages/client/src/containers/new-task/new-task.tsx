import React, { useState, useEffect } from 'react';
import TasksList from '../../components/tasks-list';
import { taskApi } from '../../api';
import { ITask } from '../../interfaces/task';
import NewTaskForm from '../../components/new-task-form';

const NewTask: React.FC = () => {
  const onSubmit = (event: any) => {
    console.log(event);
    return Promise.resolve();
  };

  return <NewTaskForm onSubmit={onSubmit} />;
};

export default NewTask;
