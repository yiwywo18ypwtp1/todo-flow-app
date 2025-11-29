"use client";

import { useState } from "react";
import { login, signup } from "@/api/auth";
import { useRouter } from "next/navigation";


export default function AuthPage() {
    const router = useRouter();

    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const setToken = (token: string) => {
        localStorage.setItem("token", token);
        router.push("/");
    };

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Please, fill entire fields!");
            return;
        }

        try {
            const response = await login({ email, password });

            setToken(response.data.token);
        } catch (err: any) {
            setError("Invalid credentials");
        }
    }

    const handleSignup = async () => {
        if (!firstName || !lastName || !email || !password) {
            setError("Please, fill entire fields!");
            return;
        }

        try {
            await signup({
                firstName,
                lastName,
                email,
                password
            });

            const response = await login({ email, password });
            setToken(response.data.token);
        } catch (err: any) {
            setError("Invalid credentials");
        }
    }

    return (
        <main className="w-full h-screen flex flex-col items-center justify-center gap-3">
            <h1 className="text-3xl text-shadow-wht">{isLogin ? "Login" : "Sign up"}</h1>
            <div className="border border-white/50 w-90 p-3 rounded-lg flex flex-col gap-3">
                {!isLogin && (<div className="flex gap-3">
                    <input
                        onChange={(e) => {
                            setError("");
                            setFirstName(e.target.value);
                        }}
                        type="text"
                        placeholder="First name"
                        className="input"
                    />
                    <input
                        onChange={(e) => {
                            setError("");
                            setLastName(e.target.value);
                        }}
                        type="text"
                        placeholder="Last name"
                        className="input"
                    />
                </div>)}

                <input
                    onChange={(e) => {
                        setError("");
                        setEmail(e.target.value);
                    }}
                    type="text"
                    placeholder="Email"
                    className="input"
                />
                <input
                    onChange={(e) => {
                        setError("");
                        setPassword(e.target.value);
                    }}
                    type="password"
                    placeholder="Password"
                    className="input"
                />

                <h1
                    onClick={() => {
                        setError("");
                        setIsLogin(!isLogin);
                    }}
                    className="my-3 text-base text-center text-pink-300 text-shadow-pnk hover:text-shadow-none cursor-pointer transition-all"
                >
                    {isLogin ? "Don't have accaunt yet?" : "Already have an accaunt?"}
                </h1>

                <button
                    onClick={isLogin ? handleLogin : handleSignup}
                    className="bg-pink-300/10 text-pink-300 border border-pink-300 rounded h-10 hover:shadow-pnk hover:bg-pink-300/20 transition-all duration-300"
                >
                    {isLogin ? "Login" : "Register"}
                </button>
            </div>

            {error && (
                <h1 className="text-base text-center animate-pulse text-red-400 transition-all">
                    {error}
                </h1>
            )}
        </main >
    )
}