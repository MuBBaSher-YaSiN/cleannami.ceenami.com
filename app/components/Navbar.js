'use client'

import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import Image from 'next/image'
import logo from "../assets/logo.jpg"
import Link from 'next/link'

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => setMenuOpen(!menuOpen)

    const links = [
        { name: 'Ceenami Music', url: 'https://ceenami.com' },
        { name: 'Ceenami Haus', url: 'https://ceenamihaus.ceenami.com' },
        { name: 'Shop', url: 'https://shop.ceenami.com' },
    ]

    return (
        <nav className="w-full bg-gradient-to-r from-blue-100 mb-20 to-blue-300 text-gray-800 fixed top-0 left-0 z-50 shadow-md">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src={logo}
                        width={48}
                        height={48}
                        alt="CleanNami Logo"
                        className="rounded-full"
                        priority
                    />
                       <span className="text-xl font-bold tracking-wide" style={{ fontFamily: 'Arkhip' }}>
                         CleanNami
                       </span>

                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8">
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            className="hover:text-blue-700 transition-colors duration-300 font-medium"
                            target={link.url.startsWith('http') ? '_blank' : '_self'}
                            rel="noopener noreferrer"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-gradient-to-r from-blue-100 to-blue-300 px-4 pb-4">
                    <div className="flex flex-col gap-4">
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                className="text-gray-800 hover:text-blue-700 transition-colors duration-300 font-medium"
                                onClick={() => setMenuOpen(false)}
                                target={link.url.startsWith('http') ? '_blank' : '_self'}
                                rel="noopener noreferrer"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    )
}
