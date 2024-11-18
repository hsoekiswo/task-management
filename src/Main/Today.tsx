import React, { useState, useEffect } from 'react'
import '../index.css'

type TodayProps = {
    onCreate: (data: boolean) => void;
    onId: (data: React.MouseEvent<HTMLLabelElement>) => void;
    onView: (data: boolean) => void;
};

function Today({ onCreate, onId, onView }: TodayProps) {
    const today = new Date();
    const todayDate = new Date().toISOString().split("T")[0].slice(0, 10);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[today.getMonth()];
    const day: string = String(today.getDate()).padStart(2, '0');
    const fullDate: string = `${day} ${month}`

    const dayNames: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName: string = dayNames[today.getDay()];

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

    useEffect(() => {
        const tasksValue: Task[] = JSON.parse(localStorage.getItem('tasks') ?? '[]');
        const filteredTasks = tasksValue.filter((task) => (task.date.includes(todayDate)))

        setTasks(filteredTasks);
    }, [setTasks, todayDate]);

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

    return (
        // Tanyain di kelas soal data type
        <main onClick={() => {onCreate(false); onView(false);}}>
            <header>
                <h1>Today</h1>
                <h2>{fullDate} • {dayName}</h2>
            </header>
            <div className="checklistContainer">
                {tasks.map((item, i) => (
                    <div>
                        <input type='checkbox' id={`check` + i}  data-id={item.id} onChange={(e) => handleCheck(e)} />
                        {/* Tanya soal e.stopPropagation */}
                        <label className='cursor-pointer ml-2 text-lg' htmlFor={`check` + i} onClick={(e) => {e.stopPropagation(); onView(true); onId(e);}}>{item.title}</label>
                    </div>
                ))}
            </div>
        </main>
    )
}

export default Today;