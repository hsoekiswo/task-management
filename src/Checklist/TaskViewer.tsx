import React, { useState } from 'react'
import '../index.css';

export default function TaskViewer({ taskStorageId }) {
    interface Task {
        id: number;
        title: string;
        description: string;
        date: string;
        priority: string;
        label: string;
        check: boolean;
    }

    const tasks: [] = JSON.parse(localStorage.getItem('tasks'));
    const selectedTask: Task[] = tasks.filter((task) => task.id === Number(taskStorageId));
    const taskIndex: number = tasks.findIndex(task => task.id === Number(taskStorageId));
    const taskId: number = selectedTask[0].id
    const taskTitle: string = selectedTask[0].title
    const taskDescription: string = selectedTask[0].description
    const taskDate: string = selectedTask[0].date
    const taskPriority: string = selectedTask[0].priority
    const taskLabel: string = selectedTask[0].label

    const [editTask, setEditTask] = useState({
        id: taskId,
        title: taskTitle,
        description: taskDescription,
        date: taskDate,
        priority: taskPriority,
        label: taskLabel
    })

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = target;
        setEditTask(prevTask => ({
            ...prevTask,
            [name]: value
        }));
    }

    const handleEdit = () => {
        // Write code here
        if (taskIndex !== -1) {
            tasks[taskIndex] = editTask;

            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    const handleDelete = () => {
        if (taskIndex != -1) {
            const updatedTasks = tasks.filter(task => task.id !== taskId);

            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        }
    }

    return (
        <div className="absolute bg-slate-500 top-32 border p-3 w-5/6">
            <form className='flex flex-col'>
                <button type='submit' onClick={handleEdit} className='fixed right-20 font-bold text-gray-400 hover:bg-transparent hover:text-white'>Save</button>
                <input type='text' name='title' value={editTask.title} onChange={handleChange} placeholder={taskTitle} className="bg-gray-600 mx-2 my-1.5 p-1 text-2xl focus:outline-none mt-8"></input>
                <textarea name='description' value={editTask.description} onChange={handleChange} placeholder={taskDescription} className="bg-gray-600 mx-2 my-1 p-1 focus:outline-none"></textarea>
                <input type='date' placeholder={taskDate} defaultValue={taskDate} className="bg-gray-600 border p-2 m-1 rounded-md"></input>
                <select name='priority' value={editTask.priority} onChange={handleChange} className="bg-gray-600 border p-2 m-1 rounded-md">
                <option disabled>Priority</option>
                <option value="priority1" className="text-red-600">Priority 1</option>
                <option value="priority2">Priority 2</option>
                <option value="priority3">Priority 3</option>
                <option value="priority4">Priority 4</option>
                </select>
                <select name='label' value={editTask.label} onChange={handleChange} className="bg-gray-600 border p-2 m-1 rounded-md">
                <option disabled>Label</option>
                <option value="family">Family</option>
                <option value="house">House</option>
                <option value="work">Work</option>
                <option value="hobby">Hobby</option>
                </select>
                <button onClick={handleDelete} className='text-red-500 border'>Delete</button>
            </form>
        </div>
    )
}