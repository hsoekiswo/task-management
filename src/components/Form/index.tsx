import { todayString } from '../../utils/date';

interface InputProps {
    register: any;
    placeholder?: string;
    className?: string;
}

interface InputDateProps {
    register: any;
    className?: string;
}

interface InputSelectProps {
    registration: any;
    defaultLabel: string;
    labels: string[]
    className?: string;
}

export function InputTitle({ register, placeholder, className }: InputProps) {
    return (
        <input
            type='text'
            {...register("title", { required: true })}
            placeholder={placeholder || 'Title'}
            className={`title ${className}`}
            >
        </input>
    )
}

export function InputDescription({ register, placeholder, className }: InputProps) {
    return (
        <textarea
            {...register("description", { required: false })}
            placeholder={placeholder || 'Description'}
            className={`description ${className}`}
        >
        </textarea>
    )
}

export function InputDate({ register, className }: InputDateProps) {
    return (
        <input
            type='date'
            {...register("date", { required: true })}
            min={todayString}
            className={`btn-select ${className}`}
        >
        </input>
    )
}

export function InputSelect({ registration, defaultLabel, labels}: InputSelectProps) {
    return (
        <select
            {...registration}    
            className={`btn-select ${className}`}
            >
            <option value="" disabled>{defaultLabel}</option>
            {labels.map((priority, index) => (
                <option key={index} value={priority}>
                {priority}
                </option>
            ))}
        </select>
    )
}