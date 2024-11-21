import React, { useState } from 'react'
import Nav from './components/Nav/Nav'
import Today from './pages/Today'
import Calendar from './pages/Calendar';
import CreateNew from './components/Checklist/CreateNew';
import { NewTaskButton } from './components/Button/Button';
import TaskViewer from './pages/TaskViewer';
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
    setTaskUpdated(prev => !prev);
    setIsCreate(false);
  };

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
          taskUpdated={taskUpdated}
        />)}
        {isView && <TaskViewer
            taskStorageId={taskID}
            onView={setIsView}
            setIsView={setIsView}
            onTaskSubmit={handleTaskSubmit}
            // taskUpdated={taskUpdated}
            // onSubmit={handleTaskEdit}
        />}
        <NewTaskButton
          isCreate={isCreate}
          onShow={() => setIsCreate(true)}
        />
        <Nav onData={handlePage} />
        {isCreate && <CreateNew
          setIsCreate={setIsCreate}
          onTaskSubmit={handleTaskSubmit}
        />}
    </>
  )
}

export default App
