import { useContext } from 'react';
import { useParams, Form, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TaskSchema, TaskSchemaType } from '../constant/schema';
import { getTaskById, updateTask, deleteTask } from '../utils/tasks';
import { todayString } from '../utils/date';
import { UpdateContext } from './root';

export default function Task() {
    const { notify } = useContext(UpdateContext)
    const { taskId } = useParams<{ taskId: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    const selectedTask = taskId ? getTaskById(Number(taskId)) : undefined;

    const { register, handleSubmit, watch, formState: { errors } } = useForm<TaskSchemaType>({
        defaultValues: selectedTask,
        resolver: zodResolver(TaskSchema),
    });

    const formValues = watch();
    // Check if at least one input is filled
    const { title } = watch();
    const isFormChanged = Object.keys(selectedTask).some(
        (key) => formValues[key as keyof TaskSchemaType] !== selectedTask[key as keyof TaskSchemaType]
    );
    const isChangeValid = isFormChanged && title.length > 5;

    const handleClose = () => {
        const from = location.state?.from || '/'
        navigate(from);
    };

    const onSubmit = (data: TaskSchemaType) => {
        if (taskId) {
            updateTask(data, Number(taskId));
            if (notify) {
                notify();
            }
            handleClose();
        }
    };

    const handleDelete = () => {
        deleteTask(Number(taskId));
        handleClose();
    };

    return (
        <div className="form-container container-edit">
            <Form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col'
            >
                <div className='flex w-full max-w-screen px-2 justify-between'>
                    <button
                        type='submit'
                        className={`${isChangeValid ? 'btn-title-bar' : 'btn-title-bar-deact'}`}
                    >
                        Save
                    </button>
                    <button
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
                {
                errors && <p className='text-red-500 p-2'>{errors.title?.message}</p>
                }
                {
                errors && <p className='text-red-500 p-2'>{errors.date?.message}</p>
                }
                <div className='btn-delete-container'>
                    <button
                        type='button'
                        onClick={handleDelete}
                        className='btn-delete'
                    >
                        Delete
                    </button>
                </div>
            </Form>
        </div>
    )
}