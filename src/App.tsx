import React, {useState} from 'react'
import Nav from './Nav/Nav'
import Today from './Main/Today'
import Calendar from './Main/Calendar';
import './index.css'

function App() {
  const [page, setPage] = useState('today');

  const handlePage = (data: string) => {
    setPage(data);
  };

  return (
    <>
      {page === 'today' && (
        <>
          <Today></Today>
          <Nav onData={handlePage}></Nav>
        </>
      )}

      {page === 'calendar' && (
        <>
          <Calendar></Calendar>
          <Nav onData={handlePage}></Nav>
        </>
      )}
    </>
  )
}

export default App
