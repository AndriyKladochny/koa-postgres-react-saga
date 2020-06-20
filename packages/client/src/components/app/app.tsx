import React from 'react';
import './app.scss';
import Tasks from '../../containers/tasks';
import NewTask from '../../containers/new-task/new-task';

function App() {
  return (
    <div className="App">
      <NewTask />
      <Tasks />
    </div>
  );
}

export default App;
