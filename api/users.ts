import { api } from "@/lib/api";

export function me(token: string) {
    return api.get("/users/me", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

api.defaults.headers.common["Cache-Control"] = "no-store";