import React, { useState } from 'react'
import './index.css';
import { todayString, TaskSchema, TaskSchemaType } from '../Data'
import { z } from "zod";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

type TaskViewerProps = {
    taskStorageId: number;
    onView: (data: boolean) => void;
    setIsView: (data: boolean) => void;
    onTaskSubmit: () => void;
};

export default function TaskViewer({ taskStorageId, onView, setIsView, onTaskSubmit }: TaskViewerProps) {
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
    const taskIndex: number | null = tasks.findIndex((task: Task) => task.id === Number(taskStorageId));
    const selectedTask: Task[] | null = tasks[taskIndex]

    const modifiedTask = {
        ...selectedTask,
        date: new Date(selectedTask.date).toISOString().split('T')[0], // Convert date to yyyy-mm-dd string format
    };
    
    const { register, handleSubmit, formState: { errors } } = useForm<TaskSchemaType>({
        defaultValues: modifiedTask,
        resolver: zodResolver(TaskSchema),
    })

    const onSubmit = (data: TaskSchemaType) => {
        tasks[taskIndex] = data;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        setIsView(false);
        onTaskSubmit();
    }

    const handleDelete = () => {
        const updatedTasks: Task[] = tasks.filter((task: Task) => task.id !== Number(taskStorageId));
        console.log(taskStorageId);
        console.log(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setIsView(false);
        onTaskSubmit();
    }

    return (
        <div className="form-container container-edit">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col'
            >
                <div className='flex w-full max-w-screen px-2 justify-between'>
                    <button type='submit' className='btn-title-bar'>Save</button>
                    <button onClick={() => onView(false)} className='btn-title-bar'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                    </button>
                </div>
                <input
                    type='text'
                    // name='title'
                    // value={editTask.title}
                    // onChange={handleChange}
                    {...register("title", { required: true })}
                    placeholder={selectedTask[0]?.title}
                    className="title title-edit">
                </input>
                <div className='divider'></div>
                <textarea
                    {...register("description", { required: true })}
                    placeholder={selectedTask[0]?.description || 'Description'}
                    className="description description-edit">
                </textarea>
                <div className='divider'></div>
                <input type='date'
                    min={todayString}
                    {...register("date", { required: true })}
                    defaultValue={selectedTask[0]?.date}
                    className="btn-select btn-select-edit">
                </input>
                <div className='divider'></div>
                <select
                    {...register("priority", { required: true })}
                    className="btn-select btn-select-edit"
                >
                    <option value="" disabled>Priority</option>
                    <option value="Priority1">Priority 1</option>
                    <option value="Priority2">Priority 2</option>
                    <option value="Priority3">Priority 3</option>
                    <option value="Priority4">Priority 4</option>
                </select>
                <div className='divider'></div>
                <select
                    {...register("label", { required: true })}
                    className="btn-select btn-select-edit"
                >
                    <option value="" disabled>Label</option>
                    <option value="Family">Family</option>
                    <option value="House">House</option>
                    <option value="Work">Work</option>
                    <option value="Hobby">Hobby</option>
                </select>
                <div className='divider'></div>
                {
                errors && <p className='text-red-500 p-2'>{errors.title?.message}</p>
                }
                {
                errors && <p className='text-red-500 p-2'>{errors.date?.message}</p>
                }
                <div className='btn-delete-container'>
                    <button type='button' onClick={handleDelete} className='btn-delete'>Delete</button>
                </div>
            </form>
        </div>
    )
}