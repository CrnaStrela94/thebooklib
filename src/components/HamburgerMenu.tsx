import Link from 'next/link'
import { useState } from 'react'
import Buttons from './btn'

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="flex mt-2 ml-8 flex-col w-full">
            <div className="self-start z-20 ">
                <Buttons onClick={() => setIsOpen(!isOpen)} text={'Menu'} type={'button'} />
            </div>
            {
                isOpen && (
                    <div className="absolute top-0 left-0 w-full h-full bg-gray-200 flex flex-col items-center justify-center z-10">
                        <Link href="/">
                            <p className="p-4 cursor-pointer text-xl">Home</p>
                        </Link>
                        <Link href="/favoauthor">
                            <p className="p-4 cursor-pointer text-xl">FavAuthor</p>
                        </Link>
                        <Link href="/favorites">
                            <p className="p-4 cursor-pointer text-xl">Favorite Book</p>
                        </Link>
                    </div>
                )
            }
        </div >
    )
}

export default HamburgerMenu