import { api } from "@/lib/api";
import { Task } from '@/types/taskType';

export async function getAllTasks() {
    return api.get("/tasks");
}

export async function createTask(data: Task) {
    return api.post("/tasks", data);
}

export async function deleteTask(id: string) {
    return api.delete(`/tasks/${id}`);
}

export async function updateTask(id: string, data: any) {
    return api.put(`/tasks/${id}`, data);
}