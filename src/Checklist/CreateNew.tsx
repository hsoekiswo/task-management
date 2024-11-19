import React, { useState } from 'react';

export default function CreateNew() {
  const today = new Date().toISOString().split("T")[0];

  const [newTask, setNewTask] = useState({
    id: 0,
    title: '',
    description: '',
    date: today,
    priority: '',
    label: '',
    check: false,
  })

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = target;
    setNewTask(prevTask => ({
      ...prevTask,
      [name]: value,
    }));
  }

  const handleSubmit = (event) => {
    const form = document.getElementById("new-task");

    if (!form.checkValidity()) {
      event.preventDefault();
    } else {
      const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const newId = allTasks.length > 0 ? allTasks[allTasks.length - 1].id + 1 : 0;
      const taskWithId = {
        ...newTask,
        id: newId,
      }

      allTasks.push(taskWithId);
      localStorage.setItem('tasks', JSON.stringify(allTasks));
    }
  }

  return (
    <div>
      <form id="new-task">
        <div className="fixed bottom-0 left-0 w-full bg-gray-600 rounded-lg">
            <div className="flex flex-col">
              <input type='text' name='title' value={newTask.title} onChange={handleChange} placeholder="Task Name" className="bg-gray-600 mx-2 my-1.5 p-1 text-2xl focus:outline-none" required></input>
              <input type='text' name='description' value={newTask.description} onChange={handleChange} placeholder="Description" className="bg-gray-600 mx-2 my-1 p-1 focus:outline-none"></input>
            </div>
            <div className="flex flex-row justify-stretch">
                <input type="date" name='date' value={newTask.date} onChange={handleChange} min={today} className="bg-gray-600 border p-2 m-1 rounded-md"></input>
                <select name='priority' value={newTask.priority} onChange={handleChange} className="bg-gray-600 border p-2 m-1 rounded-md">
                  <option value="" disabled>Priority</option>
                  <option value="Priority1">Priority 1</option>
                  <option value="Priority2">Priority 2</option>
                  <option value="Priority3">Priority 3</option>
                  <option value="Priority4">Priority 4</option>
                </select>
                <select name='label' value={newTask.label} onChange={handleChange} className="bg-gray-600 border p-2 m-1 rounded-md">
                  <option value="" disabled>Label</option>
                  <option value="Family">Family</option>
                  <option value="House">House</option>
                  <option value="Work">Work</option>
                  <option value="Hobby">Hobby</option>
                </select>
            </div>
            <div className="flex justify-end">
              <button type="submit" onClick={handleSubmit} className="text-3xl mt-3 mb-4 mr-6 rounded-full">
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
