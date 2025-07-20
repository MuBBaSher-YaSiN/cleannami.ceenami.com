'use client'

import Image from 'next/image'
import logo from "../assets/logo.png"

function Navbar() {
    return (
        <div className='py-2'>
            <div className=' w-[90%] mx-auto'>
                <Image
                    src={logo}
                    width={50}
                    height={50}
                    alt="logo Image"
                    priority
                />
            </div>
        </div>
    )
}

export default Navbar;