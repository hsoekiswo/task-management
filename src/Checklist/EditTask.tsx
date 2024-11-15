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

    const tasksValue: [] = JSON.parse(localStorage.getItem('tasks'))
    const selectedTask: Task[] = tasksValue.filter((task) => task.id === Number(taskID))
    const taskTitle: string = selectedTask[0].title
    const taskDate: string = selectedTask[0].date
    const taskPriority: string = selectedTask[0].priority
    const taskLabel: string = selectedTask[0].label

    return (
        <div className="absolute bg-slate-500 top-32 border p-3">
            <button>Edit</button>
            <button>Delete</button>
            <h1>This is edit task page</h1>
            <h2>{taskTitle}</h2>
            <h3>{taskDate}</h3>
            <p>{taskPriority}</p>
            <p>{taskLabel}</p>
        </div>
    )
}

/* Pseudocode
1. get ID from task clicked or give default value first
2. get tasks from localStorage v
3. filter task from tasks using ID v
4. show selected task on the EditTask v
*/