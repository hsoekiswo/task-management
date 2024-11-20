import React, { useState } from 'react';
import './index.css';
import { z } from "zod";

const today = new Date().toISOString().slice(0, 10);
const TaskSchema = z.object({
  id: z.number().default(0),
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string(),
  date: z.string().default(today),
  priority: z.string().default(""),
  label: z.string().default(""),
  check: z.boolean().default(false),
});

type TaskSchemaType = z.infer<typeof TaskSchema>

export default function CreateNew({ onSubmit }: { onSubmit: (task: TaskSchemaType) => void }) {
  const [newTask, setNewTask] = useState({
    id: 0,
    title: "",
    description: "",
    date: today,
    priority: "",
    label: "",
    check: false,
  });
  const [error, setError] = useState<z.ZodError<TaskSchemaType> | null >(null);
  
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = target;
    setNewTask(prevTask => ({
      ...prevTask,
      [name]: value,
    }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = TaskSchema.safeParse(newTask);

    if (!result.success) {
      setError(result.error);
      return;
    }

    onSubmit(result.data);

    // const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // const newId = allTasks.length > 0 ? allTasks[allTasks.length - 1].id + 1 : 0;
    // const taskWithId = {
    //   ...newTask,
    //   id: newId,
    // }
    // allTasks.push(taskWithId);
    // localStorage.setItem('tasks', JSON.stringify(allTasks));
  }

  return (
    <div>
      <form id="new-task" onSubmit={handleSubmit}>
        <div className="form-container">
            <div className="flex flex-col">
              <input type='text' name='title' value={newTask.title} onChange={handleChange} placeholder="Task Name" className="title" required></input>
              <textarea name='description' value={newTask.description} onChange={handleChange} placeholder="Description" className="description description-new"></textarea>
            </div>
            <div className="flex flex-row justify-stretch">
                <input type="date" name='date' value={newTask.date} onChange={handleChange} min={today} className="btn-select"></input>
                <select name='priority' value={newTask.priority} onChange={handleChange} className="btn-select">
                  <option value="" disabled>Priority</option>
                  <option value="Priority1">Priority 1</option>
                  <option value="Priority2">Priority 2</option>
                  <option value="Priority3">Priority 3</option>
                  <option value="Priority4">Priority 4</option>
                </select>
                <select name='label' value={newTask.label} onChange={handleChange} className="btn-select">
                  <option value="" disabled>Label</option>
                  <option value="Family">Family</option>
                  <option value="House">House</option>
                  <option value="Work">Work</option>
                  <option value="Hobby">Hobby</option>
                </select>
            </div>
            {error && <p className='text-red-500 p-2'>{error.errors.map(err => err.message).join(", ")}</p>}
            <div className="flex justify-end">
              <button type="submit" className="btn-submit">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-9 w-9 text-red-600" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"/>
              </svg>
              </button>
            </div>
        </div>
      </form>
    </div>
  )
}
