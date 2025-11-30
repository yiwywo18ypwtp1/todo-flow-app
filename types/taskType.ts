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
    _id: string;
    title: string;
    description: string;
    dueDate: string;
    tags: Tag[];
    subtasks: Subtask[];
    status: "today" | "future" | "done";
    priority: number;

    isDone: boolean;
}

export interface UpdateTask {
    title?: string;
    description?: string;
    dueDate?: string;
    tags?: Tag[];
    subtasks?: Subtask[];
    priority?: number;

    isDone: boolean;
}