import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

interface ButtonProps {
    text: string;
    onClick: () => void;
}

export default function Buttons({ text, onClick }: ButtonProps) {
    const [isClicked, setIsClicked] = useState(false)

    const handleClick = () => {
        onClick()
        setIsClicked(!isClicked)
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 z-10"
        >
            {text}
            <CheckCircleIcon className={`-mr-0.5 h-5 w-5 ${isClicked ? 'text-red-500' : 'text-white'}`} aria-hidden="true" />
        </button>
    )
}