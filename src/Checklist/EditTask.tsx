import '../index.css';

export default function EditTask({ taskID }) {
    interface Task {
        id: number;
        title: string;
        description: string;
        date: string;
        priority: string;
        label: string;
        check: boolean;
    }

    const tasks: [] = JSON.parse(localStorage.getItem('tasks'))
    const selectedTask: Task[] = tasks.filter((task) => task.id === Number(taskID))
    const taskTitle: string = selectedTask[0].title
    const taskDate: string = selectedTask[0].date
    const taskPriority: string = selectedTask[0].priority
    const taskLabel: string = selectedTask[0].label

    return (
        <div className="absolute bg-slate-500 top-32 border p-3">
            <button>Edit</button>
            <button>Delete</button>
            <h1>{taskTitle}</h1>
            <h2>{taskDate}</h2>
            <p>{taskPriority}</p>
            <p>{taskLabel}</p>
        </div>
    )
}