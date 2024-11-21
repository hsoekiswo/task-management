import React, { useState } from 'react'
import './index.css';
import { TaskArraySchema, TaskArrayType } from '../Data'
import { z } from "zod";

type TaskViewerProps = {
    taskStorageId: number;
    onView: (data: boolean) => void;
    setIsView: (data: boolean) => void;
    onSubmit: () => void;
};

export default function TaskViewer({ taskStorageId, onView, setIsView, onSubmit }: TaskViewerProps) {
    interface Task {
        id: number;
        title: string;
        description: string;
        date: string;
        priority: string;
        label: string;
        check: boolean;
    }

    const tasks: [] = JSON.parse(localStorage.getItem('tasks') || '[]');
    const selectedTask: Task[] | null = tasks.filter((task: Task) => task.id === Number(taskStorageId));
    const taskIndex: number | null = tasks.findIndex((task: Task) => task.id === Number(taskStorageId));
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
    });
    const [error, setError] = useState<z.ZodError<TaskArrayType> | null >(null);

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = target;
        setEditTask(prevTask => ({
            ...prevTask,
            [name]: value
        }));
    }

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();
        tasks[taskIndex] = editTask as Task;
        const result = TaskArraySchema.safeParse(tasks);

        if (!result.success) {
            setError(result.error);
            console.log(result.error);
            return;
        }

        localStorage.setItem("tasks", JSON.stringify(tasks));
        setIsView(false);
        onSubmit();
    }

    const handleDelete = () => {
        console.log('handleDelete')
        console.log(taskIndex)
        const updatedTasks: Task[] = tasks.filter((task: Task) => task.id !== taskId);
        console.log(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setIsView(false);
        onSubmit();
    }

    return (
        <div className="form-container container-edit">
            <form onSubmit={handleEdit} className='flex flex-col'>
                <div className='flex w-full max-w-screen px-2 justify-between'>
                    <button type='submit' className='btn-title-bar'>Save</button>
                    <button onClick={() => onView(false)} className='btn-title-bar'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                    </button>
                </div>
                <input type='text' name='title' value={editTask.title} onChange={handleChange} placeholder={taskTitle} className="title title-edit"></input>
                <div className='divider'></div>
                <textarea name='description' value={editTask.description} onChange={handleChange} placeholder={taskDescription && taskDescription.trim() ? taskDescription : 'Description'} className="description description-edit"></textarea>
                <div className='divider'></div>
                <input type='date' placeholder={taskDate} defaultValue={taskDate} className="btn-select btn-select-edit"></input>
                <div className='divider'></div>
                <select name='priority' value={editTask.priority} onChange={handleChange} className="btn-select btn-select-edit">
                    <option value="" disabled>Priority</option>
                    <option value="Priority1">Priority 1</option>
                    <option value="Priority2">Priority 2</option>
                    <option value="Priority3">Priority 3</option>
                    <option value="Priority4">Priority 4</option>
                </select>
                <div className='divider'></div>
                <select name='label' value={editTask.label} onChange={handleChange} className="btn-select btn-select-edit">
                    <option value="" disabled>Label</option>
                    <option value="Family">Family</option>
                    <option value="House">House</option>
                    <option value="Work">Work</option>
                    <option value="Hobby">Hobby</option>
                </select>
                <div className='divider'></div>
                {error && <p className='text-red-500 p-2'>{error.errors.map(err => err.message).join(", ")}</p>}
                <div className='btn-delete-container'>
                    <button onClick={handleDelete} className='btn-delete'>Delete</button>
                </div>
            </form>
        </div>
    )
}