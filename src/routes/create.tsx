import { Form } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TaskSchema, TaskSchemaType } from '../constant/schema';
import { createTask } from '../utils/tasks'
import { zodResolver } from '@hookform/resolvers/zod';
import { todayString } from '../utils/date';
import { InputTitle, InputDescription, InputDate, InputSelect } from '../components/Form/index';
import { PRIORITY, LABEL } from '../constant/variable';
import { SubmitButton } from '../components/Button';

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
                        <SubmitButton isFormEmpty={isFormEmpty} />
                    </div>
                </div>
            </Form>
        </div>
    )
}