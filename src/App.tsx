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
  const [taskID, setTaskID] = useState('')

  const handlePage = (data: string) => {
    setPage(data);
  };

  const handleID = (e: React.MouseEvent<HTMLLabelElement>) => {
    const elementName = e.currentTarget.getAttribute("data-id");
    setTaskID(elementName || "");
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
