"use client";

import { HexColorPicker } from "react-colorful"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createTag } from "@/api/tags";

export default function CreateNewTag() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [color, setColor] = useState("#fb2c36");

    const [error, setError] = useState<string>("");

    const handleSave = async () => {
        if (!title || !color) {
            setError("Please, fill entire fields!")
            return;
        }

        await createTag({
            title,
            color
        });

        setError("");
        router.push("/tags");
    }

    return (
        <main className="w-full h-screen flex flex-col items-center justify-center gap-3">
            <h1 className="text-3xl text-shadow-wht">Create new Tag</h1>

            <div className="border border-white/50 w-90 p-3 rounded-lg flex flex-col gap-3">
                <input
                    placeholder="Tag name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input"
                />

                <div className="flex flex-col items-center gap-4 w-full">
                    <HexColorPicker color={color} onChange={setColor} />

                    <div className="h-20 w-full rounded border border-white/25" style={{ background: color }} />

                    <input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="input"
                    />
                </div>

                <button
                    onClick={handleSave}
                    className="bg-pink-300/10 text-pink-300 border border-pink-300 rounded h-10 hover:shadow-pnk hover:bg-pink-300/20 transition-all duration-300"
                >
                    Add tag
                </button>
            </div>

            {error && (
                <h1 className="text-base text-center animate-pulse text-red-400 transition-all">
                    {error}
                </h1>
            )}
        </main>
    );
}