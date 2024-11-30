import { FieldErrors } from 'react-hook-form';
import { z } from 'zod';
import { TaskSchema } from '../../constant/schema';

type ErrorProps = {
  errors: FieldErrors<z.infer<typeof TaskSchema>>;
  inputType: keyof z.infer<typeof TaskSchema>;
};

export function Error({ errors, inputType }: ErrorProps) {
    return (
        <p className="text-red-500 p-2">{errors[inputType]?.message}</p>
    );
}