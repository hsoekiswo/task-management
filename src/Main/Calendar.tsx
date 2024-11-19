import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import '../index.css';

type CalendarProps = {
    onCreate: (data: boolean) => void;
    onId: (data: React.MouseEvent<HTMLLabelElement>) => void;
    onView: (data: boolean) => void;
};

function Calendar({ onCreate, onId, onView }: CalendarProps) {
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
            <div className='flex items-center space-x-2'>
                <input
                    type='checkbox'
                    id={`check` + task.id}  data-id={task.id} onChange={(e) => handleCheck(e)}
                    className='w-4 h-4 appearance-none bg-gray-200 border-1 border-gray-400 rounded-full checked:bg-red-500 checked:border-white checked:border-2 cursor-pointer'
                />
                <label htmlFor={`check` + task.id}>
                        <button className='ml-1' onClick={(e) => {e.stopPropagation(); onView(true); onId(e);}}>{eventInfo.event.title}</button>
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