"use client";

import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { useState } from "react";

interface SaveButtonProps {
    defaultSaved?: boolean;
    onToggle?: (saved: boolean) => void;
}

export function SaveButton({ defaultSaved = false, onToggle }: SaveButtonProps) {
    const [saved, setSaved] = useState(defaultSaved);

    const toggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setSaved(prev => {
            const next = !prev;
            onToggle?.(next);
            return next;
        });
    };

    return (
        <button
            onClick={toggle}
            className={`
                absolute top-3 right-3 p-2 rounded-full 
                shadow-md transition 
                ${saved
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-white/90 text-gray-700 hover:bg-white"
                }
            `}
            aria-label={saved ? "Unsave event" : "Save event"}
        >
            {saved ? (
                <HeartSolid className="w-5 h-5" />
            ) : (
                <HeartOutline className="w-5 h-5" />
            )}
        </button>
    );
}
