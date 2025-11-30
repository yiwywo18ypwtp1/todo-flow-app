"use client";

import { useState } from "react";

type TagProps = {
    title: string;
    color: string;
    large?: boolean;
}

const Tag = ({ title, color, large = false }: TagProps) => {
    const [hovered, setHovered] = useState(false);

    return (
        <span
            style={{
                backgroundColor: color + "20",
                borderColor: color,
                color: color,
                boxShadow: hovered ? `0 0 7.5px ${color}` : "none"
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`${large ? "text-xl w-fit cursor-pointer transition-all duration-200" : "text-xs"} px-3 py-0.5 rounded-full border`}
        >
            {title}
        </span>
    );
}

export default Tag;