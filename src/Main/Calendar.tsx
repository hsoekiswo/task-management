import React from 'react';
import FullCalendar, { DatesSetArg } from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import '../index.css';

type ShowProps = {
    onShow: (data: boolean) => void;
};

function Calendar({ onShow }: ShowProps) {
    function handleClick(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        onShow(true);  // Pass the boolean to onShow
      }

    return (
        <main onClick={handleClick}>
            <h1>Upcoming</h1>
            <div className="calendar-container">
                <div className='weekly-view'>
                    <FullCalendar
                        plugins={[ listPlugin ]}
                        initialView="listWeek"
                        weekends={true}
                        height={500}
                        events={[
                            { title: 'Read book for 15 minutes', date: '2024-11-12' },
                            { title: 'Take a cold shower', date: '2024-11-13' },
                            { title: 'Buy groceries', date: '2024-11-13' }
                        ]}
                    />
                </div>
            </div>
        </main>
    )
}

export default Calendar;