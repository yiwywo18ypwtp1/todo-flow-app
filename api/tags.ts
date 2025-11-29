import { api } from "@/lib/api";
import { CreateTag } from "@/types/tagType";

export function getAllTags() {
    return api.get("/tags");
}

export function createTag(data: CreateTag) {
    return api.post("/tags", data);
}
