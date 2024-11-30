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

export type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isFormEmpty: boolean;
};

export type SaveButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isChangeValid: boolean;
};

export type CloseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    handleClose: () => void;
};

export type DeleteButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    handleDelete: () => void;
};