"use client";

import { useState } from "react";
import { UpdateTask, Task } from "@/types/taskType";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue
} from "@/components/ui/select";
import {
    Popover,
    PopoverTrigger,
    PopoverContent
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";
import { format } from "date-fns";

interface EditTaskFormProps {
    task: Task;
    handleUpdate: (id: string, data: UpdateTask) => Promise<void>;
}

export default function EditTaskForm({ task, handleUpdate }: EditTaskFormProps) {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [priority, setPriority] = useState(String(task.priority));
    const [date, setDate] = useState<Date | undefined>(
        task.dueDate ? new Date(task.dueDate) : undefined
    );

    const onSave = async () => {
        const formatedDate = date ? `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}` : ""

        const payload: UpdateTask = {
            title,
            description,
            priority: Number(priority),
            dueDate: formatedDate
        };

        await handleUpdate(task._id, payload);
    };

    return (
        <div className="flex flex-col gap-3 mt-3">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input"
                placeholder="Title"
            />

            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="px-2 py-1 input"
                placeholder="Description"
            />

            <div className="flex items-center gap-3 w-full">
                <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger className="border-white/15 input">
                        <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-900 border-white/15">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                            <SelectItem
                                key={n}
                                value={String(n)}
                                className="hover:bg-white/5 rounded cursor-pointer transition-all"
                            >
                                {n}
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
                            {date ? (
                                format(date, "PPP")
                            ) : (
                                <span className="opacity-50 flex gap-3 items-center">
                                    Due date
                                    <Image
                                        className="drop-shadow-wht"
                                        src="/svg/calendar.svg"
                                        alt=""
                                        width={20}
                                        height={20}
                                    />
                                </span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <Button
                onClick={onSave}
                className="bg-pink-300/20 border border-pink-300 hover:bg-pink-300/30"
            >
                Save
            </Button>
        </div>
    );
}
