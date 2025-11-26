"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Divider from "./Divider";
import Image from "next/image";

const SECTIONS = [
    {
        title: null,
        items: [
            { icon: "home", name: "Home", slug: "home" },
        ]
    },
    {
        title: null,
        items: [
            { icon: "edit", name: "New task", slug: "new-task" },
            { icon: "tag", name: "Tags", slug: "tags" },
            { icon: "favorite", name: "Favorites", slug: "favorite" },
        ]
    },
    {
        title: null,
        items: [
            { icon: "today", name: "On today", slug: "today" },
            { icon: "done", name: "Completed", slug: "completed" },
        ]
    },

];

const SideNavbar = () => {
    const router = useRouter();

    const [expand, setExpand] = useState<boolean>(true);
    const [selected, setSelected] = useState<string>("home")

    return (
        <nav
            className={`bg-neutral-900 flex flex-col items-center gap-4 border-r border-white/15 p-3 transition-[width] duration-300 ease-in-out relative ${expand ? "w-[220px]" : "w-[66px]"}`}
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
                        {section.items.map((p, pi) => (
                            <div
                                key={pi}
                                onClick={() => {
                                    setSelected(p.slug);
                                    router.push(`/${p.slug}`);
                                }}
                                className={`flex items-center w-full h-10 p-2 rounded-lg border cursor-pointer transition- duration-500 ${selected === p.slug ? "border-pink-300 bg-pink-300/10 shadow-pnk *:drop-shadow-none" : "border-transparent"}`}
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

                        {si < SECTIONS.length - 1 && (
                            <Divider />
                        )}
                    </div>
                ))}
            </div >

            {expand
                ? (
                    <div className="absolute bottom-0 flex flex-row justify-between w-full py-3 px-4 border-t border-white/15">
                        <h1>Pypcik Alycik</h1>

                        <Image
                            src="/svg/logout.svg"
                            alt="done"
                            width={24}
                            height={24}
                        />
                    </div>
                )
                :
                (
                    <div className="absolute bottom-0 flex flex-row justify-center w-full py-3 px-4 border-t border-white/15">
                        <Image
                            className="drop-shadow-wht"
                            src="/svg/user.svg"
                            alt="done"
                            width={24}
                            height={24}
                        />
                    </div>
                )
            }
        </nav >
    );
}

export default SideNavbar;