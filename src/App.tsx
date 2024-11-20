import React, { useState } from 'react'
import Nav from './Nav/Nav'
import Today from './Main/Today'
import Calendar from './Main/Calendar';
import CreateNew from './Checklist/CreateNew';
import { NewTaskButton } from './Button/Button';
import TaskViewer from './Checklist/TaskViewer';
import './index.css'

function App() {
  const [page, setPage] = useState('today');
  const [isCreate, setIsCreate] = useState(false);
  const [isView, setIsView] = useState(false);
  const [taskID, setTaskID] = useState(0)

  const handlePage = (data: string) => {
    setPage(data);
  };

  const handleID = (e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const inputElement: HTMLInputElement = e.currentTarget.querySelector('input[type="checkbox"]');
    const dataId: number = inputElement.dataset.id;

    setTaskID(dataId);
  }

  const handleTaskSubmit = (task: any) => {
    const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const newId = allTasks.length > 0 ? allTasks[allTasks.length - 1].id + 1 : 0;

    const taskWithId = {
      ...task,
      id: newId,
    };

    allTasks.push(taskWithId);
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    
    console.log("Validated Task", task);
    setIsCreate(false);
  }

  return (
    <>
        {page === 'today' && (<Today
          onCreate={() => setIsCreate(false)}
          onId={handleID}
          isView={isView}
          onView={setIsView}
        />)}
        {page === 'calendar' && (<Calendar
          onCreate={() => setIsCreate(false)} 
          onId={handleID}
          onView={setIsView}
        />)}
        {isView && <TaskViewer taskStorageId={taskID} onView={setIsView}/>}
        <NewTaskButton isCreate={isCreate} onShow={() => setIsCreate(true)} />
        <Nav onData={handlePage}></Nav>
        {isCreate && <CreateNew onSubmit={handleTaskSubmit} />}
    </>
  )
}

export default App
