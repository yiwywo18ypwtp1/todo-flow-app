import { api } from "@/lib/api";
import { SignupUser, LoginUser } from "@/types/userType";

export function login(data: SignupUser) {
    return api.post("/auth/login", data);
}

export function signup(data: LoginUser) {
    return api.post("/auth/signup", data);
}
