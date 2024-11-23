import { TaskSchemaType } from './schema';

export const today = new Date();
export const todayString = today.toISOString().split('T')[0];
export const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const month = monthNames[today.getMonth()];
const day: string = String(today.getDate()).padStart(2, '0');
export const fullDate: string = `${day} ${month}`
const dayNames: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const dayName: string = dayNames[today.getDay()];

export function createTask(data: TaskSchemaType) {
    const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]")
    const newId = allTasks.length > 0 ? allTasks[allTasks.length - 1].id + 1 : 0;
    const taskWithId = {
        ...data,
        id: newId,
      };

    allTasks.push(taskWithId);
    localStorage.setItem("tasks", JSON.stringify(allTasks));
}