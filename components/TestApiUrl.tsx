"use client";

import { useEffect } from "react";
import { API_URL } from "@/lib/config";

export function TestApiUrl() {
    useEffect(() => {
        console.log("API_URL:", API_URL);
    }, []);

    return <></>
}