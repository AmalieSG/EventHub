interface ChecklistItemProps {
    text: string;
}

export function ChecklistItem({ text }: ChecklistItemProps) {
    return (
    <div className="flex items-center space-x-3 text-gray-700">
        <svg className="w-5 h-5 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>{text}</span>
    </div>
    )
}
