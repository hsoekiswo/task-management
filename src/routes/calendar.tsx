import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import { Link } from 'react-router-dom';

export default function Calendar() {
    interface Task {
        id: number;
        title: string;
        description: string;
        date: string;
        priority: string;
        label: string;
        check: boolean;
    }

    const tasks: Task[] = JSON.parse(localStorage.getItem('tasks') ?? '[]');

    const eventContent = (eventInfo) => {
        const task: Task = tasks.find((task) => task.title === eventInfo.event.title);

        return (
            <div className='task-container'>
                <Link to={`/tasks/0`}>
                    <button
                        // onClick={(e) => {e.stopPropagation(); onView(true); onId(e);}}
                        className='btn-task'
                    >
                        <input
                            type='checkbox'
                            id={`check` + task.id}
                            data-id={task.id}
                            // onClick={(e) => {e.stopPropagation(); handleCheck(e)}}
                            className='task-checkbox small-checkbox'
                        />
                        <label htmlFor={`check` + task.id} className='task-label text-lg'>{eventInfo.event.title}</label>
                    </button>
                </Link>
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
        <>
            <h1>Upcoming</h1>
            <div className="calendar-container">
                <div className='weekly-view'>
                    <FullCalendar {...calendarOptions}/>
                </div>
            </div>
        </>
    )
}