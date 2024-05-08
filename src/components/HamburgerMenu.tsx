import Link from 'next/link'
import { useState } from 'react'

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="p-6 bg-gray-600 border-2 border-gray-300 rounded-xl shadow-md flex items-center space-x-4">
            <button onClick={() => setIsOpen(!isOpen)} className="p-4">
                <img src="/menu.svg" alt="Menu" />
            </button>
            {isOpen && (
                <div className="absolute top-0 left-0 w-full h-full bg-gray-200 flex flex-col items-center justify-center">
                    <button onClick={() => setIsOpen(false)} className="p-3 absolute top-4 right-8 bg-red-500 text-white rounded-full hover:bg-red-600">
                        X
                    </button>
                    <Link href="/">
                        <p className="p-4 cursor-pointer">Home</p>
                    </Link>
                    <Link href="/favoauthor">
                        <p className="p-4 cursor-pointer">FavAuthor</p>
                    </Link>
                    <Link href="/favorites">
                        <p className="p-4 cursor-pointer">Favorite Book</p>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default HamburgerMenu