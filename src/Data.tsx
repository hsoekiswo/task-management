import { z } from 'zod';

export const today = new Date();
export const todayString = today.toISOString().split('T')[0];
export const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

export const TaskSchema = z.object({
    id: z.number().default(0),
    title: z.string().min(5, "Title must be at least 5 characters"),
    description: z.string(),
    date: z.coerce.date().min(todayDate, "Can't assign to previous date").default(todayDate),
    priority: z.string().default(""),
    label: z.string().default(""),
    check: z.boolean().default(false),
  });
export type TaskSchemaType = z.infer<typeof TaskSchema>;

export const TaskArraySchema = z.array(TaskSchema);
export type TaskArrayType = z.infer<typeof TaskArraySchema>;