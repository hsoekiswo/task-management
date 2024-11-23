import { useState, useContext, useEffect } from "react";
import { fullDate, dayName, getTodayTasks } from "../tasks";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { UpdateContext } from './root';

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
    const {tasks: initialTasks } = useLoaderData() as { tasks: Task[] };
    const [tasks, setTasks] = useState<Task[]>(initialTasks || []);
    const taskUpdated = useContext(UpdateContext);

    useEffect(() => {
        const updatedTasks = getTodayTasks();
        setTasks(updatedTasks);
    }, [taskUpdated]);

    return (
        <>
            <header>
                <h1>Today</h1>
                <h2>{fullDate} • {dayName}</h2>
            </header>
            <div>
                {tasks.map((task, i) => (
                    <div key={task.id}>
                        <Link to={`tasks/${task.id}`} className='task-container'>
                            {/* <div > */}
                            <button
                                // onClick={(e) => {e.stopPropagation();
                                // onView(!isView); onId(e);}}
                                className='btn-task'
                                >
                                <input
                                    type='checkbox'
                                    id={`check-${i}`} 
                                    data-id={task.id}
                                    onClick={(e) => e.stopPropagation()}
                                    // onClick={(e) => {e.stopPropagation();handleCheck(e);}}
                                    className='task-checkbox medium-checkbox' />
                                <label className='task-label text-xl' htmlFor={`check` + i}>
                                    {task.title}
                                </label>
                                <div className='tag'>{task.label}</div>
                            </button>
                            {/* </div> */}
                        </Link>
                        <div className="divider"></div>
                    </div>
                ))}
            </div>
        </>
    )
}