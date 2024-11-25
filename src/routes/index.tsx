import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLoaderData } from "react-router-dom";
import { UpdateContext } from './root';
import { fullDate, dayName, getTodayTasks, getCheckStatus, checkTask } from "../tasks";

export function loader() {
    const tasks = getTodayTasks();
    return { tasks };
}

export default function Index() {
    interface Task {
        id: number;
        title: string;
        description: string;
        date: string;
        priority: string;
        label: string;
        check: boolean;
    }
    const taskUpdated = useContext(UpdateContext);
    const {tasks: initialTasks } = useLoaderData() as { tasks: Task[] };
    const [tasks, setTasks] = useState<Task[]>(initialTasks || []);
    const navigate = useNavigate();

    useEffect(() => {
        const updatedTasks = getTodayTasks();
        setTasks(updatedTasks);
    }, [taskUpdated]);

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checkObject = getCheckStatus(e);
        checkTask(checkObject);
    }

    const openTask = (taskId) => {
        navigate(`/tasks/${taskId}`, { state: { from: '/' } });
    };

    return (
        <>
            <header>
                <h1>Today</h1>
                <h2>{fullDate} • {dayName}</h2>
            </header>
            <div>
                {tasks.map((task, i) => (
                    <div key={task.id}>
                        {/* <Link to={`tasks/${task.id}`} className='task-container'> */}
                            <div className='task-container'>
                            <button
                                onClick={() => openTask(task.id)}
                                className='btn-task'
                                >
                                <input
                                    type='checkbox'
                                    id={`check-${i}`} 
                                    data-id={task.id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCheck(e);
                                    }}
                                    className='task-checkbox medium-checkbox' />
                                <label className='task-label text-xl' htmlFor={`check` + i}>
                                    {task.title}
                                </label>
                                <div className='tag'>{task.label}</div>
                            </button>
                            </div>
                        {/* </Link> */}
                        <div className="divider"></div>
                    </div>
                ))}
            </div>
        </>
    )
}