import { useState, useEffect } from 'react'
import '../index.css'

type ShowProps = {
    onShow: (data: boolean) => void;
};

function Today({ onShow }: ShowProps) {
    const today = new Date();
    const todayDate = new Date().toISOString().split("T")[0];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[today.getMonth()];
    const day: string = String(today.getDate()).padStart(2, '0');
    const fullDate: string = `${day} ${month}`

    const dayNames: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName: string = dayNames[today.getDay()];

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const tasksValue = JSON.parse(localStorage.getItem('tasks')) || []
        const filteredTasks = tasksValue.filter((task: string) => (task.date.includes('2024-11-13')))

        setTasks(filteredTasks);
    }, []);

    return (
        <main onClick={onShow}>
            <header>
                <h1>Today</h1>
                <h2>{fullDate} • {dayName}</h2>
            </header>
            <div className="checklistContainer">
                <div>
                    <input type='checkbox' name='check1' />
                    <label htmlFor='check1'>Read book for 15 minutes</label>
                </div>
                <div>
                    <input type='checkbox' name='check2' />
                    <label htmlFor='check2'>Take a cold shower</label>
                </div>
                {tasks.map((item, i) => (
                    <div>
                        <input type='checkbox' name={`check` + i} />
                        <label htmlFor={`check` + i}>{item.title}</label>
                    </div>
                ))}
            </div>
        </main>
    )
}

export default Today;