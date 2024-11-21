import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import './index.css';

type CalendarProps = {
    onCreate: (data: boolean) => void;
    onId: (data: React.MouseEvent<HTMLLabelElement>) => void;
    onView: (data: boolean) => void;
    taskUpdated: boolean;
};

function Calendar({ onCreate, onId, onView, taskUpdated }: CalendarProps) {
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
    }, [taskUpdated])

    function handleClick() {
        onCreate(true);  // Pass the boolean to onShow
    }

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checkStatus: boolean = e.target.checked;
        const dataId: string = e.target.getAttribute('data-id') ?? '0';
        const tasks: Task[] = JSON.parse(localStorage.getItem('tasks') ?? '[]');
        const taskIndex: number = tasks.findIndex(task => task.id === Number(dataId));
        if (taskIndex !== -1) {
            tasks[taskIndex].check = checkStatus;
        }

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    const eventContent = (eventInfo) => {
        const task = tasks.find((task) => task.title === eventInfo.event.title);

        return (
            <div className='task-container'>
                <button  onClick={(e) => {e.stopPropagation(); onView(true); onId(e);}} className='btn-task'>
                    <input
                        type='checkbox'
                        id={`check` + task.id}  data-id={task.id} onClick={(e) => {e.stopPropagation(); handleCheck(e)}}
                        className='task-checkbox small-checkbox'
                    />
                    <label htmlFor={`check` + task.id} className='task-label text-lg'>{eventInfo.event.title}</label>
                </button>
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
        <main  onClick={() => {onCreate(false); onView(false);}}>
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