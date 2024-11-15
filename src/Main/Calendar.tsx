import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import '../index.css';

type ShowProps = {
    onShow: (data: boolean) => void;
};

function Calendar({ onShow }: ShowProps) {
    interface Task {
        id: number;
        title: string;
        description: string;
        date: string;
        priority: string;
        label: string;
        check: boolean;
    }

    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        const tasksValue: Task[] = JSON.parse(localStorage.getItem('tasks') ?? '[]');

        setTasks(tasksValue)
    }, [setTasks])

    function handleClick() {
        onShow(true);  // Pass the boolean to onShow
    }

    const eventContent = (eventInfo) => {
        const task = tasks.find((task) => task.title === eventInfo.event.title);

        return (
            <div>
                <input
                    type='checkbox'
                    // onChange={() => toggleCompletion(eventInfo.event.id)}
                />
                <label className='cursor-pointer'>
                        {eventInfo.event.title}
                </label>
            </div>
        );
    };

    const calendarOptions = {
        plugins:[ listPlugin ],
        initialView:"listWeek",
        weekends:true,
        height:500,
        events:tasks.map((task) => ({
            id: task.id,
            title: task.title,
            description: task.description,
            date: task.date,
            priority: task.priority,
            label: task.label
        })),
        eventContent
    }

    return (
        <main onClick={handleClick}>
            <h1>Upcoming</h1>
            <div className="calendar-container">
                <div className='weekly-view'>
                    <FullCalendar {...calendarOptions}/>
                </div>
            </div>
        </main>
    )
}

export default Calendar;