import {TaskSchema, TaskSchemaType} from '../schema';
// import { todayString } from '../tasks';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, useNavigate } from 'react-router-dom';

export default function Task() {
    const navigate = useNavigate();

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
    const taskIndex: number | null = tasks.findIndex((task: Task) => task.id === Number(0));
    const selectedTask: Task[] | null = tasks[taskIndex]

    // const modifiedTask = {
    //     ...selectedTask,
    //     date: new Date(selectedTask?.date).toISOString().split('T')[0], // Convert date to yyyy-mm-dd string format
    // };

    const { register } = useForm<TaskSchemaType>({
        defaultValues: selectedTask,
        resolver: zodResolver(TaskSchema),
    });

    const handleClose = () => {
        navigate(-1);
    }

    return (
        <div className="form-container container-edit">
            <Form
                // onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col'
            >
                <div className='flex w-full max-w-screen px-2 justify-between'>
                    <button
                        type='submit'
                        className='btn-title-bar'
                    >
                        Save
                    </button>
                    <button
                        // onClick={() => onView(false)}
                        onClick={handleClose}
                        className='btn-title-bar'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                    </button>
                </div>
                <input
                    type='text'
                    {...register("title", { required: true })}
                    // placeholder={selectedTask[0]?.title}
                    className="title title-edit">
                </input>
                <div className='divider'></div>
                <textarea
                    {...register("description", { required: true })}
                    // placeholder={selectedTask[0]?.description || 'Description'}
                    className="description description-edit">
                </textarea>
                <div className='divider'></div>
                <input type='date'
                    // min={todayString}
                    {...register("date", { required: true })}
                    // defaultValue={selectedTask[0]?.date}
                    className="btn-select btn-select-edit">
                </input>
                <div className='divider'></div>
                <select
                    {...register("priority", { required: true })}
                    className="btn-select btn-select-edit"
                >
                    <option value="" disabled>Priority</option>
                    <option value="Priority 1">Priority 1</option>
                    <option value="Priority 2">Priority 2</option>
                    <option value="Priority 3">Priority 3</option>
                    <option value="Priority 4">Priority 4</option>
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
                {/* {
                errors && <p className='text-red-500 p-2'>{errors.title?.message}</p>
                }
                {
                errors && <p className='text-red-500 p-2'>{errors.date?.message}</p>
                } */}
                <div className='btn-delete-container'>
                    <button
                        type='button'
                        // onClick={handleDelete}
                        className='btn-delete'
                    >
                        Delete
                    </button>
                </div>
            </Form>
        </div>
    )
}