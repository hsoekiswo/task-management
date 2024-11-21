import React, { useState } from 'react'
import Nav from './Nav/Nav'
import Today from './Main/Today'
import Calendar from './Main/Calendar';
import CreateNew from './Checklist/CreateNew';
import { NewTaskButton } from './Button/Button';
import TaskViewer from './Checklist/TaskViewer';
import './index.css'
import { TaskArrayType } from './Data';

function App() {
  const [page, setPage] = useState('today');
  const [isCreate, setIsCreate] = useState(false);
  const [isView, setIsView] = useState(false);
  const [taskID, setTaskID] = useState(0);
  const [taskUpdated, setTaskUpdated] = useState(false);

  const handlePage = (data: string) => {
    setPage(data);
  };

  const handleID = (e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const inputElement: HTMLInputElement = e.currentTarget.querySelector('input[type="checkbox"]');
    const dataId: number = inputElement.dataset.id;

    setTaskID(dataId);
  }

  const handleTaskSubmit = () => {
    setTaskUpdated(prev => !prev); // Toggle taskUpdated to trigger updates in children
    setIsCreate(false);
  };

  const handleTaskEdit = (tasks: TaskArrayType) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));

    setIsView(false);
  }

  return (
    <>
        {page === 'today' && (<Today
          onCreate={() => setIsCreate(false)}
          onId={handleID}
          isView={isView}
          onView={setIsView}
          taskUpdated={taskUpdated}
        />)}
        {page === 'calendar' && (<Calendar
          onCreate={() => setIsCreate(false)} 
          onId={handleID}
          onView={setIsView}
        />)}
        {isView && <TaskViewer
            taskStorageId={taskID}
            onView={setIsView}
            onSubmit={handleTaskEdit}
        />}
        <NewTaskButton
          isCreate={isCreate}
          onShow={() => setIsCreate(true)}
        />
        <Nav onData={handlePage} />
        {isCreate && <CreateNew
          setIsCreate={setIsCreate}
          onSubmit={handleTaskSubmit}
        />}
    </>
  )
}

export default App
