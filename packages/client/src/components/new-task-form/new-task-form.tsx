import { FC } from 'react';
import * as React from 'react';

const NewTaskForm: FC<{
  onSubmit: (event: any) => Promise<void>;
}> = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <input type="text" />
    </form>
  );
};

export default NewTaskForm;
