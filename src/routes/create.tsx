import { Form } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TaskSchema, TaskSchemaType } from '../constant/schema';
import { createTask } from '../utils/tasks'
import { zodResolver } from '@hookform/resolvers/zod';
import { todayString } from '../utils/date';
import { InputTitle, InputDescription, InputDate, InputSelect } from '../components/Form/index';
import { PRIORITY, LABEL } from '../constant/variable';

type CreateProps = {
    setShowCreate: (data: boolean) => void;
    informUpdate: () => void;
    onNotify: () => void;
  }

export default function Create( { setShowCreate, informUpdate, onNotify }: CreateProps) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<TaskSchemaType>({
        defaultValues: {
            id: 0,
            date: todayString,
            description: '',
            priority: '',
            label: '',
        },
        resolver: zodResolver(TaskSchema)
    });

    const onSubmit = (data: TaskSchemaType) => {
        createTask(data);
        setShowCreate(false);
        informUpdate();
    };

    // Watch all form values
    const { title, date } = watch();

    // Check if any required field is empty
    const isFormEmpty = !title?.trim() || !date?.toString().trim() || title.length < 5;

    return (
        <div className="relative z-10">
            <Form
                onSubmit={handleSubmit((data) => {
                    onSubmit(data);
                    onNotify();
                })}
                id="new-task"
            >
                <div className="form-container">
                    <div className="flex flex-col">
                        <InputTitle
                            register={register}
                        />
                        <InputDescription
                            register={register}
                            className="description-new"
                        />
                    </div>
                    <div className="flex flex-row justify-stretch">
                        <InputDate
                            register={register}
                        />
                        <InputSelect
                            registration={register("priority", { required: false })}
                            defaultLabel='Priority'
                            labels={PRIORITY}
                        />
                        <InputSelect
                            registration={register("label", { required: false })}
                            defaultLabel='Label'
                            labels={LABEL}
                        />
                    </div>
                    <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isFormEmpty}
                        className={`${isFormEmpty ? 'btn-submit-deact' : 'btn-submit'}`}
                        >
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