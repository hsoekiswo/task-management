import React from "react";

export interface Task {
    id: number;
    title: string;
    description: string;
    date: string;
    priority: string;
    label: string;
    check: boolean;
}

export type EventInfoProps = {
    eventInfo: { event: { title: string | number | boolean | React.ReactElement<string> | Iterable<React.ReactNode> | null | undefined; }; }; 
    task: Task | undefined; 
    onTaskOpen: (taskId: string | number) => void; 
    onTaskCheck: (e: React.ChangeEvent<HTMLInputElement>) => void; 
}