import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

type ButtonProps = {
    text: string;
    type: "button" | "reset" | "submit";
    onClick: () => void;
};

export default function Buttons({ text, type, onClick }: ButtonProps) {
    const [isClicked, setIsClicked] = useState(false)

    const handleClick = () => {
        onClick()
        setIsClicked(!isClicked)
    }

    return (
        <button
            type={type}
            onClick={handleClick}
            className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
        >
            {isClicked ? <CheckCircleIcon className="h-5 w-5 text-white" /> : null}
            {text}
        </button>
    )
}