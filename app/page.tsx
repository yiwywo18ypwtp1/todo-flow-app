"use client";

import { useState } from "react";
import TaskCard from "@/components/TaskCard";
import Divider from "@/components/Divider";

const TASKS = [
    {
        id: "t1",
        title: "Pay",
        description: "Pay salaries to employees",
        status: "in-process",
        priority: 7,
        dueDate: "2026-12-20",

        tags: [
            { id: "tag1", title: "work", color: "#51a2ff" },
            { id: "tag2", title: "important", color: "#ff6467" },
            { id: "tag3", title: "pay", color: "#ffdf20" },
        ],

        subtasks: [
            { id: "s1", title: "calculate taxes", done: false },
            { id: "s2", title: "transfer money", done: true },
        ],
    },
    {
        id: "t2",
        title: "Grocery shopping",
        description: "Buy all necessary products for the week",
        status: "on-today",
        priority: 5,
        dueDate: "2025-02-28",

        tags: [
            { id: "tag4", title: "home", color: "#38d39f" },
            { id: "tag5", title: "food", color: "#ffd166" },
        ],

        subtasks: [
            { id: "s3", title: "Buy vegetables", done: false },
            { id: "s4", title: "Buy chicken", done: false },
            { id: "s5", title: "Get coffee", done: true },
        ],
    },
    {
        id: "t3",
        title: "Gym workout",
        description: "Full body workout + stretching",
        status: "on-today",
        priority: 2,
        dueDate: "2025-02-27",

        tags: [
            { id: "tag6", title: "health", color: "#9b5de5" },
            { id: "tag7", title: "sport", color: "#00f5d4" },
        ],

        subtasks: [
            { id: "s6", title: "Warm-up", done: true },
            { id: "s7", title: "Strength exercises", done: false },
            { id: "s8", title: "Stretching", done: false },
        ],
    },
    {
        id: "t4",
        title: "Finish project",
        description: "Complete the remaining features and push to GitHub",
        status: "done",
        priority: 10,
        dueDate: "2025-03-02",

        tags: [
            { id: "tag8", title: "coding", color: "#6ef2f0" },
            { id: "tag9", title: "important", color: "#ff6467" },
        ],

        subtasks: [
            { id: "s9", title: "Fix UI bugs", done: false },
            { id: "s10", title: "Add modal windows", done: true },
            { id: "s11", title: "Write documentation", done: false },
        ],
    },
    {
        id: "t5",
        title: "Clean the apartment",
        description: "Clean up the rooms, kitchen, and bathroom",
        status: "done",
        priority: 6,
        dueDate: "2025-02-25",

        tags: [
            { id: "tag10", title: "home", color: "#38d39f" },
            { id: "tag11", title: "cleaning", color: "#a0c4ff" },
        ],

        subtasks: [
            { id: "s12", title: "Vacuum floor", done: true },
            { id: "s13", title: "Wash dishes", done: true },
            { id: "s14", title: "Bathroom cleaning", done: true },
        ],
    }
]

export default function Home() {
    const [tasks, setTasks] = useState(TASKS)

    function markAsDone(id: string) {
        setTasks(prev =>
            prev.map(t =>
                t.id === id ? { ...t, status: "done" } : t
            )
        )
    }

    return (
        <div className="flex gap-6 p-6 w-full">
            <div className="flex-1 flex flex-col gap-5">
                <h2 className="text-lg font-medium tracking-wide">All</h2>

                <div className="flex flex-col gap-3 h-full overflow-y-scroll scroll-hide">
                    {TASKS.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onDone={(id) => {
                                setTasks(prev =>
                                    prev.map(t =>
                                        t.id === id ? { ...t, status: "done" } : t
                                    )
                                );
                            }}
                        />
                    ))}
                </div>
            </div>

            <Divider vertical />

            <div className="flex-1 flex flex-col gap-5">
                <h2 className="text-lg font-medium tracking-wide">On today</h2>

                <div className="flex flex-col gap-3 h-full overflow-y-scroll scroll-hide">
                    {TASKS
                        .filter(task => task.status === "on-today")
                        .map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onDone={(id) => {
                                    setTasks(prev =>
                                        prev.map(t =>
                                            t.id === id ? { ...t, status: "done" } : t
                                        )
                                    );
                                }}
                            />
                        ))}
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-5">
                <h2 className="text-lg font-medium tracking-wide">In process</h2>

                <div className="flex flex-col gap-3 h-full overflow-y-scroll scroll-hide">
                    {TASKS
                        .filter(task => task.status === "in-process")
                        .map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onDone={(id) => {
                                    setTasks(prev =>
                                        prev.map(t =>
                                            t.id === id ? { ...t, status: "done" } : t
                                        )
                                    );
                                }}
                            />
                        ))}
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-5">
                <h2 className="text-lg font-medium tracking-wide">Done</h2>

                <div className="flex flex-col gap-3 h-full overflow-y-scroll scroll-hide">
                    {TASKS
                        .filter(task => task.status === "done")
                        .map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onDone={(id) => {
                                    setTasks(prev =>
                                        prev.map(t =>
                                            t.id === id ? { ...t, status: "done" } : t
                                        )
                                    );
                                }}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}
