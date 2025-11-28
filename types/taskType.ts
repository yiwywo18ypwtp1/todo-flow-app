export interface Subtask {
    id: string;
    title: string;
    done: boolean;
}

export interface Tag {
    id: string;
    title: string;
    color: string;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    tags: Tag[];
    subtasks: Subtask[];
    status: 'done' | 'on-today' | 'in-process';
    priority: number;
}