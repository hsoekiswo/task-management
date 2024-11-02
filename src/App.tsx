import React from 'react'
import './App.css'

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Today</h1>
      <h2>2 Nov • Saturday</h2>
      <div>
        <input type='checkbox' name='check1' />
        <label for='check1'>Read book for 15 minutes</label>
      </div>
      <aside>
        <div>Today</div>
        <div>Upcoming</div>
      </aside>
    </>
  )
}

export default App
