import React, { useState, useContext, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import { UpdateContext } from './root';
import { getTasks, getCheckStatus, checkTask } from '../utils/tasks';
import { todayString } from '../utils/date';
import { EventContent } from'../components/Button/index'
import { Task } from '../constant/type';

export function loader() {
    const tasks = getTasks();
    return { tasks }
}

export default function Calendar() {
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

    const openTask = (taskId: number) => {
        navigate(`/tasks/${taskId}`, { state: { from: '/calendar' } });
    };

    const eventContent = (eventInfo: { event: { title: string | number | boolean | React.ReactElement<string> | Iterable<React.ReactNode> | null | undefined; }; }) => {
        const task: Task | undefined = tasks.find((task) => task.title === eventInfo.event.title);

        return (
            <EventContent
                eventInfo={eventInfo}
                task={task}
                onTaskOpen={openTask}
                onTaskCheck={handleCheck}
            />
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