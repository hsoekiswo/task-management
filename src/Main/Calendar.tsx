import React from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import '../index.css';

function Calendar() {
    return (
        <>
            <h1>Upcoming</h1>
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                weekends={false}
                events={[
                    { title: 'event 1', date: '2024-09-05' },
                    { title: 'event 2', date: '2024-09-06' }
                ]}
            />
        </>
    )
}

export default Calendar;