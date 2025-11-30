"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Divider from "@/components/Divider";
import { sortTasks } from "@/utils/sortTask";
import { Task, UpdateTask } from "@/types/taskType";
import { Tag as TagType } from "@/types/tagType";
import TaskColumn from "@/components/TasksColumn";
import { deleteTask, getAllTasks, updateTask } from "@/api/tasks";
import { computeStatus } from "@/utils/computeStatus";
import { useDebounce } from "@/hooks/useDebounce";
import { searchTask } from "@/api/tasks";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Tag from "@/components/Tag";
import { getAllTags } from "@/api/tags";


export default function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [tags, setTags] = useState<TagType[]>([]);


    const [search, setSearch] = useState("");
    const [selectedTag, setSelectedTag] = useState("");
    const debouncedSearch = useDebounce(search, 300);

    const [sortAll, setSortAll] = useState<string>("none");
    const [sortToday, setSortToday] = useState<string>("none");
    const [sortInProcess, setSortInProcess] = useState<string>("none");
    const [sortDone, setSortDone] = useState<string>("none");

    const all = sortTasks(tasks, sortAll);
    const today = sortTasks(tasks.filter(t => t.status === "today"), sortToday);
    const inProcess = sortTasks(tasks.filter(t => t.status === "future"), sortInProcess);
    const done = sortTasks(tasks.filter(t => t.status === "done"), sortDone);

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await getAllTasks();

            const tasksWithStatus = response.data.map((t: Task) => ({
                ...t,
                status: computeStatus(t),
            }));

            setTasks(tasksWithStatus);
        };

        fetchTasks();
    }, []);

    useEffect(() => {
        const fetchTags = async () => {
            const response = await getAllTags();

            setTags([...response.data.userTags, ...response.data.baseTags]);
        };

        fetchTags();
    }, []);

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await getAllTasks();
            const tasksWithStatus = response.data.map((t: Task) => ({
                ...t,
                status: computeStatus(t),
            }));
            setTasks(tasksWithStatus);
        };

        const search = async () => {
            const q = debouncedSearch.trim() || undefined;
            const tag = selectedTag.trim() || undefined;

            if (!q && !tag) {
                await fetchTasks();
                return;
            }

            try {
                const res = await searchTask({ q, tag });

                if (res.data.message === "Not found") {
                    setTasks([]);
                } else {
                    const tasksWithStatus = res.data.map((t: Task) => ({
                        ...t,
                        status: computeStatus(t),
                    }));
                    setTasks(tasksWithStatus);
                }
            } catch (err) {
                console.error(err);
            }
        };

        search();
    }, [debouncedSearch, selectedTag]);


    const markAsDone = async (id: string) => {
        await updateTask(id, { isDone: true });

        setTasks(prev =>
            prev.map(task =>
                task._id === id
                    ? { ...task, isDone: true, status: "done" }
                    : task
            )
        );
    };

    const markAsInProcess = async (id: string) => {
        await updateTask(id, { isDone: false });

        setTasks(prev =>
            prev.map(task =>
                task._id === id
                    ? { ...task, isDone: false, status: computeStatus(task) }
                    : task
            )
        );
    };


    const hadleDelete = async (id: string) => {
        try {
            await deleteTask(id);

            setTasks(prev => prev.filter(task => task._id !== id));
        } catch (error) {
            console.error("Delete error:", error);
        }
    };


    const toggleSubtask = async (taskId: string, subtaskId: string) => {
        setTasks(prev =>
            prev.map(task =>
                task._id === taskId
                    ? {
                        ...task,
                        subtasks: task.subtasks.map(st =>
                            st.id === subtaskId
                                ? { ...st, done: !st.done }
                                : st
                        )
                    }
                    : task
            )
        );

        try {
            const task = tasks.find(t => t._id === taskId);
            if (!task) return;

            const updated = task.subtasks.map(st =>
                st.id === subtaskId ? { ...st, done: !st.done } : st
            );

            await updateTask(taskId, {
                subtasks: updated,
            });
        } catch (err) {
            console.error("Failed to update subtask:", err);
        }
    };


    const updateTaskFields = async (id: string, fields: UpdateTask): Promise<void> => {
        try {
            await updateTask(id, fields);

            setTasks(prev =>
                prev.map(t =>
                    t._id === id ? { ...t, ...fields } : t
                )
            );
        } catch (err) {
            console.error("Failed to update task:", err);
        }
    };

    return (
        <div className="w-full h-full flex flex-col p-6 gap-4 overflow-hidden">
            <div className="relative w-full flex">
                <Image
                    src="/svg/lens.svg"
                    width={20}
                    height={20}
                    alt="search"
                    className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50 drop-shadow-wht"
                />

                <div className="flex items-center w-full gap-3">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search tasks by name..."
                        className="input flex-1 pl-10! rounded-full!"
                    />

                    <p className="opacity-50 italic">or</p>

                    <Select value={selectedTag} onValueChange={setSelectedTag}>
                        <SelectTrigger className="border-white/15 input w-fit! rounded-full! pl-3!">
                            <SelectValue placeholder="Search by tag" />
                        </SelectTrigger>

                        <SelectContent className="bg-neutral-900 border-white/15">
                            {tags.map(t => (
                                <SelectItem
                                    key={t._id}
                                    value={t.title}
                                >
                                    <Tag
                                        title={t.title}
                                        color={t.color}
                                    />
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <button
                        onClick={() => {
                            setSearch("");
                            setSelectedTag("");
                        }}
                        className="opacity-50 text-lg"
                    >╳
                    </button>
                </div>
            </div>

            <div className="flex gap-6 w-full h-full">
                <TaskColumn
                    title="All"
                    tasks={all}
                    sort={sortAll}
                    setSort={setSortAll}
                    markAsDone={markAsDone}
                    handleDelete={hadleDelete}
                    handleUpdate={updateTaskFields}
                    toggleSubtask={toggleSubtask}
                    markAsInProcess={markAsInProcess}
                />

                <Divider vertical />

                <TaskColumn
                    title="On today"
                    tasks={today}
                    sort={sortToday}
                    setSort={setSortToday}
                    markAsDone={markAsDone}
                    handleDelete={hadleDelete}
                    handleUpdate={updateTaskFields}
                    toggleSubtask={toggleSubtask}
                    markAsInProcess={markAsInProcess}
                />

                <TaskColumn
                    title="Future & Overdue"
                    tasks={inProcess}
                    sort={sortInProcess}
                    markAsDone={markAsDone}
                    handleDelete={hadleDelete}
                    handleUpdate={updateTaskFields}
                    setSort={setSortInProcess}
                    toggleSubtask={toggleSubtask}
                    markAsInProcess={markAsInProcess}
                />

                <TaskColumn
                    title="Done"
                    tasks={done}
                    sort={sortDone}
                    setSort={setSortDone}
                    markAsDone={markAsDone}
                    handleDelete={hadleDelete}
                    handleUpdate={updateTaskFields}
                    toggleSubtask={toggleSubtask}
                    markAsInProcess={markAsInProcess}
                />
            </div>
        </div >
    );
}
