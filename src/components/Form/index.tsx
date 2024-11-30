import React from 'react';

interface InputTextProps {
  register: any;
  placeholder: string;
  className: string;
}

export function InputTitle({ register, placeholder, className }: InputTextProps) {
    return (
        <input
            type='text'
            {...register("title", { required: true })}
            placeholder={placeholder}
            className={className}
            >
        </input>
    )
}

export function InputDescription({ register, placeholder, className }: InputTextProps) {
    return (
        <textarea
            {...register("description", { required: false })}
            placeholder={placeholder}
            className={className}
        >
        </textarea>
    )
}