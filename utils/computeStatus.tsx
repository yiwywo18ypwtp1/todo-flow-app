import { Task } from "@/types/taskType";

export function computeStatus(task: Task): "today" | "future" | "done" {
    const today = new Date().toISOString().slice(0, 10);

    if (task.isDone) return "done";

    if (task.dueDate === today) return "today";

    return "future";
}