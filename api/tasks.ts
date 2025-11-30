import { api } from "@/lib/api";
import { CreateTask, UpdateTask } from '@/types/taskType';

export async function getAllTasks() {
    return api.get("/tasks");
}

export async function createTask(data: CreateTask) {
    return api.post("/tasks", data);
}

export async function deleteTask(id: string) {
    return api.delete(`/tasks/${id}`);
}

export async function updateTask(id: string, data: UpdateTask) {
    return api.patch(`/tasks/${id}`, data);
}

export async function searchTask(params: { q?: string; tag?: string }) {
    const qs = new URLSearchParams();
    if (params.q) qs.set("q", params.q);
    if (params.tag) qs.set("tag", params.tag);

    return api.get(`/tasks/search?${qs.toString()}`);
}