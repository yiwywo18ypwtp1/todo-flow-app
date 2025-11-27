"use client";

import { useState } from "react";
import Image from "next/image";
import { formatDate } from "@/lib/date";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import Tag from "./Tag";
import MyTooltip from "./MyTooltip";


interface Subtask {
    id: string;
    title: string;
    done: boolean;
}

interface Tag {
    id: string;
    title: string;
    color: string;
}

interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    tags: Tag[];
    subtasks: Subtask[];
    status: string;
    priority: number;
}

interface TaskCardProps {
    task: Task;
    onDone: (id: string) => void;
}

const STATUS_COLORS: Record<string, string> = {
    "in-process": "#00a6f4",
    "on-today": "#7c86ff",
    "done": "#00e78b",
};

const getPriorityColor = (p: number) => {
    if (p >= 9) return "#fb2c36";
    if (p >= 6) return "#ff8904";
    if (p >= 3) return "#ffd230";
    if (p >= 1) return "#aadf65";
};

export default function TaskCard({ task, onDone }: TaskCardProps) {
    const [checked, setChecked] = useState<boolean>(false);
    const [openDesc, setOpenDesc] = useState<boolean>(false);
    const [showControlBtns, setShowManage] = useState<boolean>(false);

    const taskColor = STATUS_COLORS[task.status] || "gray";
    const priorityColor = getPriorityColor(task.priority);

    return (
        <div
            onMouseEnter={() => setShowManage(true)}
            onMouseLeave={() => setShowManage(false)}
            style={{ borderColor: taskColor + "75" }}
            className={`flex flex-col gap-3 bg-[#111] border p-4 rounded-xl overflow-visible hover:bg-white/5 transition-all`}
        >
            <div className="flex flex-row items-start justify-between">
                <div className="flex gap-4 items-center">
                    <Checkbox
                        checked={checked}
                        onCheckedChange={(value) => setChecked(!!value)}
                        className="
                            border-white/15 data-[state=checked]:bg-pink-300/10 
                            data-[state=checked]:border-pink-300 h-4.5 w-4.5
                        "
                    />

                    <div>
                        <div className="flex items-center gap-2">
                            <MyTooltip content={`Priority: ${task.priority.toString()}`}>
                                <div
                                    style={{
                                        backgroundColor: priorityColor + "75",
                                        borderColor: priorityColor
                                    }}
                                    className="w-3.5 h-3.5 rounded-full border"
                                ></div>
                            </MyTooltip>

                            <h1 className="font-medium">{task.title}</h1>
                        </div>

                        <div className="flex gap-1.5">
                            <p className="text-xs opacity-50">{formatDate(task.dueDate)}</p>
                            <p className="text-xs opacity-50">•</p>
                            <p className="text-xs opacity-50">{task.status.replace("\-", " ")}</p>
                        </div>
                    </div>
                </div>

                {checked ? (
                    <Button
                        onClick={() => onDone(task.id)}
                        variant="outline"
                        className="h-8 px-2 bg-green-300/10 border-green-300 hover:bg-green-300/20"
                    >
                        Mark as done
                    </Button>
                ) : (
                    <div className={`flex items-center gap-2 ${showControlBtns ? "opacity-100 saturate-100" : "opacity-50 saturate-50"} transition-all duration-300`}>
                        < Dialog >
                            <DialogTrigger asChild>
                                <MyTooltip content="Edit task">
                                    <Button variant="outline" className="h-8 px-2 bg-pink-300/10 border-pink-300 hover:bg-pink-300/20">
                                        <Image src="/svg/edit.svg" alt="Edit" width={20} height={20} />
                                    </Button>
                                </MyTooltip>
                            </DialogTrigger>

                            <DialogContent className="bg-[#111] border border-white/10 text-white">
                                <DialogHeader>
                                    <DialogTitle>Edit task</DialogTitle>
                                    <DialogDescription>Change the title or description.</DialogDescription>
                                </DialogHeader>

                                <div className="flex flex-col gap-3 mt-3">
                                    <input
                                        defaultValue={task.title}
                                        className="px-2 py-1 bg-black/40 rounded border border-white/20"
                                    />
                                    <textarea
                                        defaultValue={task.description}
                                        className="px-2 py-1 bg-black/40 rounded border border-white/20"
                                    />
                                    <Button className="bg-pink-300/20 border border-pink-300">Save</Button>
                                </div>
                            </DialogContent>
                        </Dialog>

                        <MyTooltip content="Delete task">
                            <Button variant="outline" className="h-8 px-2 bg-red-300/10 border-red-300 hover:bg-red-300/20">
                                <Image src="/svg/trash.svg" alt="Delete" width={20} height={20} />
                            </Button>
                        </MyTooltip>
                    </div>
                )
                }
            </div >

            {
                task.tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                        {task.tags.map(tag => (
                            <Tag
                                key={tag.id}
                                title={tag.title}
                                color={tag.color}
                            />
                        ))}
                    </div>
                )
            }

            {
                task.description && (
                    <button
                        onClick={() => setOpenDesc(v => !v)}
                        className="text-xs opacity-60 hover:opacity-100 transition"
                    >
                        {openDesc ? "Hide details ↑" : "Show details ↓"}
                    </button>
                )
            }

            {
                openDesc && (
                    <p className="text-sm opacity-80 leading-relaxed">{task.description}</p>
                )
            }

            {
                task.subtasks.length > 0 && (
                    <div className="flex flex-col gap-2 mt-2">
                        {task.subtasks.map((sub) => {
                            const [done, setDone] = useState(sub.done);

                            return (
                                <label
                                    key={sub.id}
                                    className="flex items-center gap-3 cursor-pointer"
                                >
                                    <Checkbox
                                        checked={done}
                                        onCheckedChange={(v) => setDone(!!v)}
                                        className="border-white/15 data-[state=checked]:bg-pink-300/10 data-[state=checked]:border-pink-300 h-4.5 w-4.5"
                                    />

                                    <span className={`transition-all ${done ? "line-through opacity-50" : ""}`}>
                                        {sub.title}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                )
            }
        </div >
    );
}
