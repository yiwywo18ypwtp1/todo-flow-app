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

api.interceptors.response.use(
    (response) => response,

    (error) => {
        const status = error.response?.status;

        if (status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/auth";
        }

        return Promise.reject(error);
    }
);
