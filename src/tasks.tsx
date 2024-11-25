import React from 'react';
import { TaskSchemaType } from './schema';

export const today = new Date();
const [monthNumFmt, dayNumFmt, yearNumFmt] = today
  .toLocaleDateString('default', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).split(/[-./]/);
export const todayString = `${yearNumFmt}-${monthNumFmt}-${dayNumFmt}`
export const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthName = monthNames[today.getMonth()];
export const fullDate: string = `${dayNumFmt} ${monthName}`
const dayNames: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const dayName: string = dayNames[today.getDay()];

interface Task {
  id: number;
  title: string;
  description: string;
  date: string | Date;
  priority: string;
  label: string;
  check: boolean;
}

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

export function getTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks') ?? '[]');
  return tasks;
}

export function getTodayTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks') ?? '[]');
  const filteredTasks = tasks.filter((task: Task) => ((task.date as string).includes(todayString)))
  return filteredTasks;
}

export function getTaskById(taskId: number) {
  const tasks: [] = JSON.parse(localStorage.getItem('tasks') || '[]');
  const taskIndex: number | null = tasks.findIndex((task: Task) => task.id === taskId);
  const selectedTask: Task[] | null = tasks[taskIndex] ?? null;

  // Update date type from Date to string so HTML can show as placeholder
  const modifiedTask = {
      ...selectedTask,
      date: new Date(selectedTask.date).toISOString().split('T')[0],
  };
  return modifiedTask;
}

export function updateTask(data: TaskSchemaType, taskId: number) {
  const tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
  tasks[taskId] = data;
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function deleteTask(taskId: number) {
  const tasks: [] = JSON.parse(localStorage.getItem('tasks') || '[]');
  const updatedTasks: Task[] = tasks.filter((task: Task) => task.id !== Number(taskId));
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

export function getCheckStatus(e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement, MouseEvent>) {
  const checkStatus: boolean = (e.target as HTMLInputElement).checked;
  const dataId: string | null = (e.target as HTMLElement).getAttribute('data-id');
  const checkObject = {
    'checkStatus': checkStatus,
    'dataId': dataId
  }
  return checkObject;
}

interface CheckObject {
  dataId: string | null;
  checkStatus: boolean;
}

export function checkTask(checkObject: CheckObject) {
  const tasks: Task[] = getTasks();
  const taskIndex: number = tasks.findIndex(task => task.id === Number(checkObject.dataId));
  if (taskIndex !== -1) {
      tasks[taskIndex].check = checkObject.checkStatus;
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));
}