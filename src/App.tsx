import React, {useState} from 'react'
import Nav from './Nav/Nav'
import Today from './Main/Today'
import Calendar from './Main/Calendar';
import CreateNew from './Checklist/CreateNew';
import NewTaskButton from './Button/Button';
import './index.css'

function App() {
  const [page, setPage] = useState('today');
  const [isActive, setIsActive] = useState(false);

  const handlePage = (data: string) => {
    setPage(data);
  };

  return (
    <>
      {page === 'today' && (
        <>
            <main>
                <Today></Today>
            </main>
            <Nav onData={handlePage}></Nav>
        </>
      )}

      {page === 'calendar' && (
        <>
            <main>
                <Calendar></Calendar>
            </main>
            <Nav onData={handlePage}></Nav>
        </>
      )}
    </>
  )
}

export default App
