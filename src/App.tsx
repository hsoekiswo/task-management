import React, {useState} from 'react'
import Nav from './Nav/Nav'
import Today from './Main/Today'
import Calendar from './Main/Calendar';
import CreateNew from './Checklist/CreateNew';
import { NewTaskButton } from './Button/Button';
import './index.css'
import EditTask from './Checklist/EditTask';

function App() {
  const [page, setPage] = useState('today');
  const [isActive, setIsActive] = useState(false);
  const [isEdit, setEdit] = useState(false);
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
          isEdit={isEdit}
          onEdit={() => setEdit(!isEdit)}
          onID={handleID}
        />)}
        {page === 'calendar' && (<Calendar onShow={() => setIsActive(false)} />)}
        {isEdit && <EditTask taskID={taskID}/>}
        <NewTaskButton isActive={isActive} onShow={() => setIsActive(true)} />
        <Nav onData={handlePage}></Nav>
        {isActive && <CreateNew/>}
    </>
  )
}

export default App
