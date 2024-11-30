import { useContext } from 'react';
import { useParams, Form, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TaskSchema, TaskSchemaType } from '../constant/schema';
import { getTaskById, updateTask, deleteTask } from '../utils/tasks';
import { UpdateContext } from './root';
import { InputTitle, InputDescription, InputDate, InputSelect } from '../components/Form/index';
import { PRIORITY, LABEL } from '../constant/variable';

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

    // Check if at least one input is filled
    const { title, description, date, priority, label } = watch();
    const isFormChanged = 
        title !== selectedTask?.title ||
        description !== selectedTask?.description ||
        date !== selectedTask?.date ||
        priority !== selectedTask?.priority ||
        label !== selectedTask?.label;
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
                <InputTitle
                    register={register}
                    placeholder={selectedTask[0]?.title}
                    className="title-edit"
                />
                <div className='divider'></div>
                <InputDescription
                    register={register}
                    placeholder={selectedTask[0]?.description}
                    className="description-edit"
                />
                <div className='divider'></div>
                <InputDate
                    register={register}
                    className='btn-select-edit'
                />
                <div className='divider'></div>
                <InputSelect
                    registration={register("priority", { required: false })}
                    defaultLabel='Priority'
                    labels={PRIORITY}
                    className='btn-select-edit'
                />
                <div className='divider'></div>
                <InputSelect
                    registration={register("label", { required: false })}
                    defaultLabel='Label'
                    labels={LABEL}
                    className='btn-select-edit'
                />
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