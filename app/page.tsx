"use client";

import { useState } from "react";
import Divider from "@/components/Divider";
import { sortTasks } from "@/utils/sortTask";
import { Task } from "@/types/taskType";
import TaskColumn from "@/components/TasksColumn";

const TASKS: Task[] = [
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
    const [tasks, setTasks] = useState(TASKS);

    const [sortAll, setSortAll] = useState<string>("none");
    const [sortToday, setSortToday] = useState<string>("none");
    const [sortInProcess, setSortInProcess] = useState<string>("none");
    const [sortDone, setSortDone] = useState<string>("none");

    const all = sortTasks(tasks, sortAll);
    const today = sortTasks(tasks.filter(t => t.status === "on-today"), sortToday);
    const inProcess = sortTasks(tasks.filter(t => t.status === "in-process"), sortInProcess);
    const done = sortTasks(tasks.filter(t => t.status === "done"), sortDone);

    const markAsDone = (id: string) => {
        setTasks(prev =>
            prev.map(t =>
                t.id === id ? { ...t, status: "done" } : t
            )
        )
    }

    const markAsUndone = (id: string) => {
        setTasks(prev =>
            prev.map(t =>
                t.id === id ? { ...t, status: "in-process" } : t
            )
        )
    }

    return (
        <div className="flex gap-6 p-6 w-full">
            <TaskColumn
                title="All"
                tasks={all}
                sort={sortAll}
                setSort={setSortAll}
                markAsDone={markAsDone}
                markAsUndone={markAsUndone}
            />

            <Divider vertical />

            <TaskColumn
                title="On today"
                tasks={today}
                sort={sortToday}
                setSort={setSortToday}
                markAsDone={markAsDone}
                markAsUndone={markAsUndone}
            />

            <TaskColumn
                title="In process"
                tasks={inProcess}
                sort={sortInProcess}
                setSort={setSortInProcess}
                markAsDone={markAsDone}
                markAsUndone={markAsUndone}
            />

            <TaskColumn
                title="Done"
                tasks={done}
                sort={sortDone}
                setSort={setSortDone}
                markAsDone={markAsDone}
                markAsUndone={markAsUndone}
            />
        </div>
    );
}
