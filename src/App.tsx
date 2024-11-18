import React, {useState} from 'react'
import Nav from './Nav/Nav'
import Today from './Main/Today'
import Calendar from './Main/Calendar';
import CreateNew from './Checklist/CreateNew';
import { NewTaskButton } from './Button/Button';
import TaskViewer from './Checklist/TaskViewer';
import './index.css'

function App() {
  const [page, setPage] = useState('today');
  const [isActive, setIsActive] = useState(false);
  const [isView, setIsView] = useState(false);
  const [taskID, setTaskID] = useState(0)

  const handlePage = (data: string) => {
    setPage(data);
  };

  const handleID = (e: React.MouseEvent<HTMLLabelElement>) => {
    e.preventDefault()
    const inputId: string = e.currentTarget.getAttribute('for');
    const inputElement: HTMLInputElement = document.getElementById(inputId);
    const dataId: number = inputElement.dataset.id;

    setTaskID(dataId);
  }

  return (
    <>
        {page === 'today' && (<Today
          onShow={() => setIsActive(false)}
          onID={handleID}
          onView={setIsView}
        />)}
        {page === 'calendar' && (<Calendar onShow={() => setIsActive(false)} />)}
        {isView && <TaskViewer taskStorageId={taskID}/>}
        <NewTaskButton isActive={isActive} onShow={() => setIsActive(true)} />
        <Nav onData={handlePage}></Nav>
        {isActive && <CreateNew/>}
    </>
  )
}

export default App
