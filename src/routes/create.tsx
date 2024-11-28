import { Form } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TaskSchema, TaskSchemaType } from '../schema';
import { createTask } from '../tasks'
import { zodResolver } from '@hookform/resolvers/zod';
import { todayString } from '../tasks';

type CreateProps = {
    setShowCreate: (data: boolean) => void;
    informUpdate: () => void;
  }

export default function Create( { setShowCreate, informUpdate }: CreateProps) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<TaskSchemaType>({
        defaultValues: {
            id: 0,
            date: todayString,
            description: '',
            priority: '',
            label: '',
        },
        resolver: zodResolver(TaskSchema)
    })

    const onSubmit = (data: TaskSchemaType) => {
        createTask(data);
        setShowCreate(false);
        informUpdate();
    };

     // Watch all form values
     const { title, date } = watch();

    // Check if any required field is empty
    const isFormEmpty = !title?.trim() || !date?.toString().trim();

    return (
        <div className="relative z-10">
            <Form
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
                    <button type="submit" disabled={isFormEmpty} className={`${isFormEmpty ? 'btn-submit-deact' : 'btn-submit'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={`${isFormEmpty ? 'icon-submit-deact' : 'icon-submit'}`} viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"/>
                        </svg>
                        </button>
                    </div>
                </div>
            </Form>
        </div>
    )
}