"use client";

import Tag from "@/components/Tag";
import { getAllTags } from "@/api/tags";
import { useEffect, useState } from "react";
import * as TagType from "@/types/tagType";
import Divider from "@/components/Divider";
import { useRouter } from "next/navigation";


export default function TagPage() {
    const router = useRouter();

    const [userTags, setUserTags] = useState<TagType.Tag[]>([]);
    const [baseTags, setBaseTags] = useState<TagType.Tag[]>([]);

    useEffect(() => {
        const fetchTags = async () => {
            const response = await getAllTags();
            console.log(response.data);

            setUserTags(response.data.userTags);
            setBaseTags(response.data.baseTags);
        }

        fetchTags();
    }, []);

    return (
        <main className="w-full h-screen flex flex-col p-6 gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl text-shadow-wht">Tags</h1>

                <button
                    onClick={() => router.push("/tags/new-tag")}
                    className="bg-pink-300/10 text-xl text-pink-300 border border-pink-300 px-4 py-1 rounded-full flex items-center gap-3 hover:bg-pink-300/20 hover:shadow-pnk transition-all duration-300">
                    <p className="text-2xl">+</p>
                    <p>New tag</p>
                </button>
            </div>

            <Divider />

            <div className="flex flex-col gap-3">
                <h1 className="text-lg opacity-75 italic">Default tags</h1>

                <div className="flex flex-wrap gap-3">
                    {baseTags.map(t => (
                        <Tag
                            key={t._id}
                            title={t.title}
                            color={t.color}
                            large
                        />
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <h1 className="text-lg opacity-75 italic">Your tags</h1>

                <div className="flex flex-wrap gap-3">
                    {userTags.map(t => (
                        <Tag
                            key={t._id}
                            title={t.title}
                            color={t.color}
                            large
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}