"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Divider from "./Divider";
import Image from "next/image";
import { me } from "@/api/users";
import { User } from "@/types/userType";

const SECTIONS = [
    {
        title: null,
        items: [
            { icon: "home", name: "Home", slug: "/" },
        ]
    },
    {
        title: "Manage",
        items: [
            { icon: "edit", name: "Create task", slug: "new-task" },
            { icon: "tag", name: "My Tags", slug: "tags" },
        ]
    },
    {
        title: "FILTER",
        items: [
            { icon: "today", name: "On today", slug: "today" },
            { icon: "clock", name: "In progress", slug: "undone" },
            { icon: "done", name: "Done", slug: "Done" },
        ]
    },
];

const SideNavbar = () => {
    const router = useRouter();

    const [expand, setExpand] = useState<boolean>(true);
    const [selected, setSelected] = useState<string>("/");

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            const respose = await me(token);
            console.log(respose.data)

            if (!respose) return;
            setUser(respose.data);
        }

        fetchUser();
    }, []);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("token");
        router.push("/auth")
    }

    return (
        <nav
            className={`bg-neutral-900 shrink-0 flex flex-col items-center gap-4 border-r border-white/15 p-3 transition-[width] duration-300 ease-in-out relative ${expand ? "w-[220px]" : "w-[66px]"}`}
        >
            <div className="flex items-center w-full h-10 justify-start">

                <div
                    onClick={() => setExpand(!expand)}
                    className={`flex items-center shrink-0 ${expand ? "justify-end" : "justify-center"} gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-all`}
                >
                    <Image
                        className="drop-shadow-wht"
                        src={expand ? "/svg/arrow-back.svg" : "/svg/menu.svg"}
                        alt="Show/hide menu"
                        width={28}
                        height={28}
                    />
                </div>

                <h1
                    className={`text-lg text-center whitespace-no wrap transition-all duration-300${expand ? "opacity-100 ml-2 w-full" : "opacity-0 w-0 ml-0 overflow-hidden"}
                    `}
                >
                    Overview
                </h1>
            </div>

            <Divider />

            <div
                onMouseEnter={() => setExpand(true)}
                className="flex flex-col w-full items-center gap-3"
            >

                {SECTIONS.map((section, si) => (
                    <div
                        key={si}
                        className="w-full flex flex-col gap-3 "
                    >
                        {si > 0 && (
                            <>
                                {expand ? (
                                    section.title && (
                                        <h3 className={`text-xs mt-4 tracking-wider text-white/40 px-2 ${expand ? "opacity-100" : "opacity-0 w-0 ml-0 overflow-hidden"}`}>
                                            {section.title}
                                        </h3>
                                    )
                                ) : (
                                    <Divider />
                                )}
                            </>
                        )}

                        {section.items.map((p, pi) => (
                            <div
                                key={pi}
                                onClick={() => {
                                    setSelected(p.slug);
                                    router.push(`/${p.slug}`);
                                }}
                                className={`flex items-center w-full h-10 p-2 hover:bg-white/5 rounded-lg border cursor-pointer transition- duration-500 ${selected === p.slug ? "border-pink-300 bg-pink-300/10 shadow-pnk *:drop-shadow-none" : "border-transparent"}`}
                            >
                                <Image
                                    className="drop-shadow-wht"
                                    src={`/svg/${p.icon}.svg`}
                                    alt={p.name}
                                    width={23}
                                    height={23}
                                />

                                <h1
                                    className={`whitespace-nowrap transition-all duration-300 ${expand ? "opacity-100 ml-5" : "opacity-0 w-0 ml-0 overflow-hidden"}`}
                                >
                                    {p.name}
                                </h1>
                            </div>
                        ))}
                    </div>
                ))}
            </div >

            {expand
                ? (
                    <div className="absolute bottom-0 flex flex-row items-center justify-between w-full py-3 px-4 border-t border-white/15">
                        {user ? (
                            <>
                                <h1 className="whitespace-no">{user?.firstName} {user?.lastName}</h1>

                                <div
                                    onClick={handleLogout}
                                    className={`flex items-center shrink-0 ${expand ? "justify-end" : "justify-center"} gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-all`}
                                >
                                    <Image
                                        className="drop-shadow-wht"
                                        src="/svg/logout.svg"
                                        alt="Show/hide menu"
                                        width={24}
                                        height={24}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <h1>Log in</h1>

                                <div
                                    onClick={() => router.push("/auth")}
                                    className={`flex items-center shrink-0 ${expand ? "justify-end" : "justify-center"} gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-all`}
                                >
                                    <Image
                                        src="/svg/login.svg"
                                        alt="done"
                                        width={24}
                                        height={24}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="absolute bottom-0 flex flex-row justify-center w-full py-3 px-4 border-t border-white/15">
                        {user ? (
                            <>
                                <div
                                    onClick={handleLogout}
                                    className={`flex items-center shrink-0 ${expand ? "justify-end" : "justify-center"} gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-all`}
                                >
                                    <Image
                                        className="drop-shadow-wht"
                                        src="/svg/logout.svg"
                                        alt="Show/hide menu"
                                        width={24}
                                        height={24}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <Image
                                    src="/svg/login.svg"
                                    alt="done"
                                    width={24}
                                    height={24}
                                />
                            </>
                        )}
                    </div>
                )
            }
        </nav >
    );
}

export default SideNavbar;