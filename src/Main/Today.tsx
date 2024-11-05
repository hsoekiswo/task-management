import React from "react";
import '../index.css'

function Today() {
    const today = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[today.getMonth()];
    const day: string = String(today.getDate()).padStart(2, '0');
    const fullDate: string = `${day} ${month}`

    const dayNames: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName: string = dayNames[today.getDay()];

    return (
        <>
            <header>
                <h1>Today</h1>
                <h2>{fullDate} • {dayName}</h2>
            </header>
            <div>
                <div>
                    <input type='checkbox' name='check1' />
                    <label htmlFor='check1'>Read book for 15 minutes</label>
                </div>
                <div>
                    <input type='checkbox' name='check1' />
                    <label htmlFor='check2'>Take a cold shower</label>
                </div>
            </div>
            <div className='new-task'>
                <button className='btn-new-task'>+</button>
            </div>
        </>
    )
}

export default Today;