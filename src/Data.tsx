import { z } from 'zod';

export const today = new Date().toISOString().slice(0, 10);

export const TaskSchema = z.object({
    id: z.number().default(0),
    title: z.string().min(5, "Title must be at least 5 characters"),
    description: z.string(),
    date: z.string().default(today),
    priority: z.string().default(""),
    label: z.string().default(""),
    check: z.boolean().default(false),
  });
export type TaskSchemaType = z.infer<typeof TaskSchema>;

export const TaskArraySchema = z.array(TaskSchema);
export type TaskArrayType = z.infer<typeof TaskArraySchema>;