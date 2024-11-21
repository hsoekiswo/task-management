// import React from 'react';
import './index.css';
import { todayString, TaskSchema, TaskSchemaType } from '../../Data'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

type CreateNewProps = {
  setIsCreate: (data: boolean) => void;
  onTaskSubmit: () => void;
}

export default function CreateNew({ setIsCreate, onTaskSubmit }: CreateNewProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<TaskSchemaType>({
    defaultValues: {
      id: 0,
      description: '',
      date: todayString,
      priority: '',
      label: '',
    },
    resolver: zodResolver(TaskSchema)
  })

  const onSubmit = (data: TaskSchemaType) => {
    console.log(`data: ${JSON.stringify(data)}`);
    const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const newId = allTasks.length > 0 ? allTasks[allTasks.length - 1].id + 1 : 0;
    const taskWithId = {
      ...data,
      id: newId,
    };

    allTasks.push(taskWithId);
    localStorage.setItem("tasks", JSON.stringify(allTasks));

    setIsCreate(false);
    onTaskSubmit();
  }
  console.log("errors form", errors);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="new-task"
      >
        <div className="form-container">
            <div className="flex flex-col">
              <input
                type='text'
                {...register("title", { required: true })}
                placeholder="Task Name"
                className="title"
                >
              </input>
              <textarea
                {...register("description", { required: false })}
                placeholder="Description"
                className="description description-new">
              </textarea>
            </div>
            <div className="flex flex-row justify-stretch">
                <input
                  type="date"
                  min={todayString}
                  {...register("date", { required: true })}
                  className="btn-select">
                </input>
                <select
                  {...register("priority", { required: false })}
                  className="btn-select">
                  <option value='' disabled>Priority</option>
                  <option>Priority 1</option>
                  <option>Priority 2</option>
                  <option>Priority 3</option>
                  <option>Priority 4</option>
                </select>
                <select
                  {...register("label", { required: false })}
                  className="btn-select">
                  <option value="" disabled>Label</option>
                  <option>Family</option>
                  <option>House</option>
                  <option>Work</option>
                  <option>Hobby</option>
                </select>
            </div>
            {
              errors && <p className='text-red-500 p-2'>{errors.title?.message}</p>
            }
            {
              errors && <p className='text-red-500 p-2'>{errors.date?.message}</p>
            }
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
