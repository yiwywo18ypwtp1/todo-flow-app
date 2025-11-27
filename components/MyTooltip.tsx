"use client";

import { ReactNode, useState, useRef, useEffect } from "react";


interface MyTooltipProps {
    content: string;
    children: ReactNode;
}

const MyTooltip = ({ content, children }: MyTooltipProps) => {
    const [show, setShow] = useState(false);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (show && ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setPos({
                x: rect.left + rect.width / 2,
                y: rect.top - 8,
            });
        }
    }, [show]);

    return (
        <>
            <div
                ref={ref}
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
                className="inline-flex"
            >
                {children}
            </div>

            {show && (
                <div
                    className="
                        fixed z-9999 border border-white/15
                        -translate-x-1/2 -translate-y-full
                        bg-neutral-950 text-white text-xs px-2 py-1 rounded shadow
                        transition-all duration-150
                        whitespace-nowrap
                    "
                    style={{ left: pos.x, top: pos.y }}
                >
                    {content}

                    <div
                        className="
                            absolute left-1/2 top-full -translate-x-1/2
                            w-0 h-0
                            border-l-4 border-r-4 border-t-4
                            border-l-transparent border-r-transparent border-t-neutral-950
                        "
                    />
                </div>
            )}
        </>
    );
};

export default MyTooltip;