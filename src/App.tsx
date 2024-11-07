import React, {useState} from 'react'
import Nav from './Nav/Nav'
import Today from './Main/Today'
import Calendar from './Main/Calendar';
import './index.css'

function App() {
<<<<<<< Updated upstream
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
=======
    const unusedVar = 1;

    return (
        <>
            <h1 className="text-3xl font-bold underline">Today</h1>
            <h2>2 Nov • Saturday</h2>
            <div>
                <input type="checkbox" name="check1" />
                <label htmlFor="check1">Read book for 15 minutes</label>
            </div>
            <aside>
                <div>Today</div>
                <div>Upcoming</div>
            </aside>
        </>
    )
>>>>>>> Stashed changes
}

export default App
