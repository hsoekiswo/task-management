import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { UpdateContext } from './root';
import { getTodayTasks, getCheckStatus, checkTask } from "../utils/tasks";
import { fullDate, dayName } from "../utils/date";
import { Task } from '../constant/type'
import { TaskButton } from '../components/Button/index'

export function loader() {
    const tasks = getTodayTasks();
    return { tasks };
}

export default function Index() {
    const taskUpdated = useContext(UpdateContext);
    const {tasks: initialTasks } = useLoaderData() as { tasks: Task[] };
    const [tasks, setTasks] = useState<Task[]>(initialTasks || []);
    const navigate = useNavigate();

    useEffect(() => {
        const updatedTasks = getTodayTasks();
        setTasks(updatedTasks);
    }, [taskUpdated]);

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const checkObject = getCheckStatus(e);
        checkTask(checkObject);
    }

    const openTask = (taskId: number) => {
        navigate(`/tasks/${taskId}`, { state: { from: '/' } });
    };

    return (
        <>
            <header>
                <h1>Today</h1>
                <h2>{fullDate} • {dayName}</h2>
            </header>
            <div>
            {tasks.map((task) => (
                <div key={task.id} className="task-container">
                <TaskButton
                    id={task.id}
                    title={task.title}
                    label={task.label}
                    onOpen={openTask}
                    onCheck={handleCheck}
                />
                <div className="divider"></div>
                </div>
            ))}
            </div>
        </>
    )
}