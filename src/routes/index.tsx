import { useState, useContext, useEffect } from "react";
import { fullDate, dayName } from "../tasks";
import { Link } from "react-router-dom";
import { UpdateContext } from './root';
import { todayString } from "../tasks";

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
    const [tasks, setTasks] = useState<Task[]>([]);
    const taskUpdated = useContext(UpdateContext);

    useEffect(() => {
        const tasksValue: Task[] = JSON.parse(localStorage.getItem('tasks') ?? '[]');
        const filteredTasks = tasksValue.filter((task) => (task.date.includes(todayString)))
        setTasks(filteredTasks);
    }, [taskUpdated]);

    return (
        <>
            <header>
                <h1>Today</h1>
                <h2>{fullDate} • {dayName}</h2>
            </header>
            <div>
                {tasks.map((item, i) => (
                    <>
                        <Link to={`tasks/0`}>
                        <div className='task-container'>
                                <button
                                    // onClick={(e) => {e.stopPropagation();
                                    // onView(!isView); onId(e);}}
                                    className='btn-task'
                                >
                                    <input
                                        type='checkbox'
                                        id={`check` + i} 
                                        data-id={item.id}
                                        onClick={(e) => e.stopPropagation()}
                                        // onClick={(e) => {e.stopPropagation();handleCheck(e);}}
                                        className='task-checkbox medium-checkbox' />
                                    <label className='task-label text-xl' htmlFor={`check` + i}>
                                        {item.title}
                                    </label>
                                    <div className='tag'>{item.label}</div>
                                </button>
                        </div>
                        </Link>
                        <div className="divider"></div>
                    </>
                ))}
            </div>
        </>
    )
}