"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import Image from "next/image";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Tag as TagType, BackendTag } from "@/types/tagType";
import { getAllTags } from "@/api/tags";
import Tag from "@/components/Tag";
import { createTask } from "@/api/tasks";
import { CreateTask, Subtask } from "@/types/taskType";

export default function CreatTask() {
    const router = useRouter();

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [priority, setPriority] = useState<string>("0");
    const [date, setDate] = useState<Date>();

    const [tags, setTags] = useState<TagType[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const [subtasks, setSubtasks] = useState<string[]>([]);

    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTags = async () => {
            const response = await getAllTags();
            console.log(response.data);

            setTags([...response.data.userTags, ...response.data.baseTags]);
        }

        fetchTags();
    }, []);

    const handleCreate = async () => {
        if (!title || !description || !priority || !date) {
            setError("Please, fill * fields!");
            return;
        }

        const selectedTagObjects: BackendTag[] = selectedTags
            .map(id => tags.find(t => t._id === id))
            .filter((t): t is TagType => Boolean(t))
            .map(t => ({
                id: t._id,
                title: t.title,
                color: t.color
            }));

        const formattedSubtasks: Subtask[] = subtasks
            .filter(t => t.trim() !== "")
            .map(t => ({
                id: crypto.randomUUID(),
                title: t,
                done: false,
            }));

        const formattedDate =
            date ? `${date.getFullYear()}-${(date.getMonth() + 1)
                .toString()
                .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}` : "";

        const formattedPriority = Number(priority);

        try {
            const payload: CreateTask = {
                title: title,
                description: description,
                dueDate: formattedDate,
                tags: selectedTagObjects,
                subtasks: formattedSubtasks,
                priority: formattedPriority,
                isDone: false
            }

            console.log(payload);

            const response = await createTask(payload);

            setError("");
            router.push("/");
            console.log("TASK CREATED:", response.data);
        } catch (err) {
            console.error(err);
        }
    }

    const addTag = (id: string) => {
        if (!selectedTags.includes(id)) {
            setSelectedTags([...selectedTags, id]);
        }
    };

    const removeTag = (id: string) => {
        setSelectedTags(selectedTags.filter(t => t !== id));
    };

    const handleSubtaskChange = (index: number, value: string) => {
        const updated = [...subtasks];
        updated[index] = value;
        setSubtasks(updated);
    };

    const addSubtask = () => {
        setSubtasks([...subtasks, ""]);
    };

    const removeSubtask = (index: number) => {
        const updated = subtasks.filter((_, i) => i !== index);
        setSubtasks(updated);
    };

    return (
        <main className="w-full h-screen max-h-screen flex flex-col items-center justify-center gap-3">
            <h1 className="text-3xl text-shadow-wht">Create new Task</h1>

            <div className="border border-white/50 w-90 p-3 rounded-lg flex flex-col gap-3">
                <input
                    placeholder="Title*"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input"
                />
                <input
                    placeholder="Small description*"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="input"
                />

                <div className="flex items-center gap-3 w-full">
                    <Select
                        value={priority}
                        onValueChange={setPriority}
                    >
                        <SelectTrigger className="border-white/15 input">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-neutral-900 border-white/15">
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                <SelectItem
                                    key={n}
                                    value={String(n)}
                                    className="hover:bg-white/5 rounded cursor-pointer transition-all"
                                >
                                    {n === 0 ? <p className="opacity-50">Priority</p> : `${n}`}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                data-empty={!date}
                                className="data-[empty=true]:text-muted-foreground input w-1/2!"
                            >
                                {date ? format(date, "PPP") : <span className="opacity-50 flex gap-3 items-center">
                                    Due date*
                                    <Image
                                        className="drop-shadow-wht"
                                        src="/svg/calendar.svg"
                                        alt="Show/hide menu"
                                        width={20}
                                        height={20}
                                    />
                                </span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={date} onSelect={setDate} />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="flex flex-col gap-3">
                    <Select onValueChange={addTag}>
                        <SelectTrigger className="border-white/15 input flex items-center gap-2">
                            <span className="text-white/70">Select tags</span>
                        </SelectTrigger>

                        <SelectContent className="bg-neutral-900 border-white/15">
                            {tags.map(t => (
                                <SelectItem key={t._id} value={t._id}>
                                    <Tag title={t.title} color={t.color} />
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {selectedTags.length > 0 && (
                        <div className="flex gap-2 flex-wrap">
                            {selectedTags.map(id => {
                                const tag = tags.find(t => t._id === id);
                                if (!tag) return null;

                                return (
                                    <div key={id} className="relative">
                                        <Tag title={tag.title} color={tag.color} />

                                        <button
                                            onClick={() => removeTag(id)}
                                            className="absolute top-0 -right-1 bg-red-400 text-white rounded-full w-3 h-3 flex items-center justify-center text-[8px]"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-3 max-h-50 overflow-y-scroll scroll-hide">
                    {subtasks.map((task, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <input
                                className="input w-full"
                                placeholder={`Subtask #${index + 1}`}
                                value={task}
                                onChange={(e) => handleSubtaskChange(index, e.target.value)}
                            />

                            {index >= 0 && (
                                <button
                                    onClick={() => removeSubtask(index)}
                                    className="text-red-400 hover:text-red-300"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <button
                    onClick={addSubtask}
                    className="input border-dashed! text-white/35 transition-all text-sm min-h-10"
                >
                    {subtasks.length !== 0 ? "+ add another" : "+ Add subtask"}
                </button>

                <button
                    onClick={handleCreate}
                    className="bg-pink-300/10 text-pink-300 border border-pink-300 rounded h-10 hover:shadow-pnk hover:bg-pink-300/20 transition-all duration-300"
                >
                    Create task
                </button>

                <p className="text-xs opacity-25 text-center italic">* — required fields. Please, don't skip them</p>
            </div>

            {error && (
                <h1 className="text-base text-center animate-pulse text-red-400 transition-all">
                    {error}
                </h1>
            )}
        </main>
    );
}