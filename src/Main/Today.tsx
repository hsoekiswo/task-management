import React, { useState, useEffect } from 'react'
import '../index.css'

type TodayProps = {
    onShow: (data: boolean) => void;
    isEdit: boolean;
    onEdit: (data: boolean) => void;
    onID: (data: React.MouseEvent<HTMLLabelElement>) => void;
};

function Today({ onShow, isEdit, onEdit, onID }: TodayProps) {
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
        // Tanyain di kelas
        <main onClick={onShow}>
            <header>
                <h1>Today</h1>
                <h2>{fullDate} • {dayName}</h2>
            </header>
            <div className="checklistContainer">
                {tasks.map((item, i) => (
                    <div>
                        <input type='checkbox' id={`check` + i}  data-id={item.id} onChange={(e) => handleCheck(e)} />
                        <label className='cursor-pointer ml-2 text-lg' htmlFor={`check` + i} onClick={(e) => {onEdit(!isEdit); onID(e);}}>{item.title}</label>
                    </div>
                ))}
            </div>
        </main>
    )
}

export default Today;

/*
Pseudo code checklist
1. store ID when event check the list
2. identify the ID on localStorage, filter task
3. change false to true or vice versa
*/