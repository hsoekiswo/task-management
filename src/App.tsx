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
