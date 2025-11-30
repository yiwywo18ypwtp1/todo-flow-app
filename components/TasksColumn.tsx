"use client";

import Image from "next/image";
import { Task, UpdateTask } from "@/types/taskType";
import TaskCard from "./TaskCard";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { AnimatePresence } from "motion/react";

type ColumnProps = {
    title: string;
    tasks: Task[];
    sort: string;
    setSort: (value: string) => void;
    markAsDone: (id: string) => void;
    markAsInProcess: (id: string) => void;
    handleDelete: (id: string) => void;
    handleUpdate: (taskId: string, fields: UpdateTask) => Promise<void>;
    toggleSubtask: (taskId: string, subtaskId: string) => void;
}

const TaskColumn = ({ title, tasks, sort, setSort, markAsDone, markAsInProcess, handleDelete, handleUpdate, toggleSubtask }: ColumnProps) => {
    return (
        <div className="flex flex-col gap-6 w-full flex-1">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium tracking-wide">{title}</h2>

                <div className="flex items-center gap-2">
                    <h3>Sort:</h3>

                    <Select value={sort} onValueChange={setSort}>
                        <SelectTrigger className="border-white/15 focus:outline-0 hover:bg-white/5 transition-all">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-neutral-900 border-white/15">
                            <SelectItem
                                value="none"
                                className="hover:bg-white/5 rounded cursor-pointer transition-all"
                            >
                                None
                            </SelectItem>
                            <SelectGroup>
                                <SelectLabel className="opacity-50 mt-2">By priority</SelectLabel>


                                <SelectItem
                                    value="priority-asc"
                                    className="hover:bg-white/5 rounded cursor-pointer transition-all"
                                >
                                    Lowest first
                                    <Image src="/svg/sort-to-high.svg" alt="Edit" width={24} height={24} />
                                </SelectItem>
                                <SelectItem
                                    value="priority-desc"
                                    className="hover:bg-white/5 rounded cursor-pointer transition-all"
                                >
                                    Highest first
                                    <Image src="/svg/sort-to-low.svg" alt="Edit" width={24} height={24} />
                                </SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                                <SelectLabel className="opacity-50 mt-2">By date</SelectLabel>

                                <SelectItem
                                    value="due-soon"
                                    className="hover:bg-white/5 rounded cursor-pointer transition-all"
                                >
                                    Nearest first
                                    <Image src="/svg/clock-nearest.svg" alt="Edit" width={24} height={24} />
                                </SelectItem>
                                <SelectItem
                                    value="due-late"
                                    className="hover:bg-white/5 rounded cursor-pointer transition-all"
                                >
                                    Farthest first
                                    <Image src="/svg/calendar.svg" alt="Edit" width={24} height={24} />
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex flex-col gap-3 h-200 max-h-200 flex-1 overflow-y-auto scroll-hide">
                <AnimatePresence initial={false}>
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <TaskCard
                                key={task._id}
                                task={task}
                                onDone={markAsDone}
                                handleDelete={handleDelete}
                                toggleSubtask={toggleSubtask}
                                handleUpdate={handleUpdate}
                                markAsInProcess={markAsInProcess}
                            />
                        ))
                    ) : (
                        <div className="border border-dashed border-white/15 rounded-xl text-white/25 text-center w-full h-60 flex items-center justify-center">
                            There are no tasks in this category
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default TaskColumn;