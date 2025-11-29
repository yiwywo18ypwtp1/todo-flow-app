"use client";

import axios from "axios";
import { API_URL } from "./config";


export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");

        if (!config.url?.startsWith("/auth")) {
            if (token) config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});
