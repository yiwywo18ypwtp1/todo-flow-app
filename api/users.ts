import { api } from "@/lib/api";

export function me(token: string) {
    return api.get("/auth/me");
}