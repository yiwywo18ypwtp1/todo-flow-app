import { Task } from "@/types/taskType";

export function sortTasks(tasks: Task[], mode: string): Task[] {
    if (mode === "priority-desc") {
        return [...tasks].sort((a, b) => b.priority - a.priority);
    }

    if (mode === "priority-asc") {
        return [...tasks].sort((a, b) => a.priority - b.priority);
    }

    if (mode === "due-soon") {
        return [...tasks].sort(
            (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        );
    }

    if (mode === "due-late") {
        return [...tasks].sort(
            (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
        );
    }

    return tasks;
}
