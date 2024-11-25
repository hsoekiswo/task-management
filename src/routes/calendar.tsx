import React, { useState, useContext, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import { UpdateContext } from './root';
import { getTasks, getCheckStatus, checkTask, todayString } from '../tasks';

export function loader() {
    const tasks = getTasks();
    return { tasks }
}

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
    const { tasks: initialTasks } = useLoaderData() as { tasks: Task[] };
    const [tasks, setTasks] = useState<Task[]>(initialTasks || []);
    const taskUpdated = useContext(UpdateContext);
    const navigate = useNavigate();

    useEffect(() => {
        const updatedTasks = getTasks();
        setTasks(updatedTasks);
    }, [taskUpdated]);

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checkObject = getCheckStatus(e);
        checkTask(checkObject);
    }

    const openTask = (taskId) => {
        navigate(`/tasks/${taskId}`, { state: { from: '/calendar' } });
    };

    const eventContent = (eventInfo) => {
        const task: Task = tasks.find((task) => task.title === eventInfo.event.title);

        return (
            <div className='task-container'>
                    <button
                        onClick={() => openTask(task.id)}
                        className='btn-task'
                    >
                        <input
                            type='checkbox'
                            id={`check` + task.id}
                            data-id={task.id}
                            onClick={(e) => {e.stopPropagation(); handleCheck(e)}}
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
        validRange: {
            start: todayString
        },
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