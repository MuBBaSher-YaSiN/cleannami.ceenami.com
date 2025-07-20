'use client'


import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../Assets/Logo Files/Main Logo Files/For Web/svg/Color logo - no background.svg'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const buttons = ['HOME', 'SERVICE', 'FQA', 'PRICING', 'BOOK ONLINE NOW']

    // Close menu when resizing to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && isMenuOpen) {
                setIsMenuOpen(false)
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [isMenuOpen])

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    // Animation variants
    const navItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut"
            }
        })
    }

    const menuVariants = {
        closed: {
            height: 0,
            opacity: 0,
            transition: {
                duration: 0.3,
                ease: "easeInOut",
                when: "afterChildren"
            }
        },
        open: {
            height: "auto",
            opacity: 1,
            transition: {
                duration: 0.4,
                ease: "easeInOut",
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    }

    const buttonVariants = {
        rest: { scale: 1 },
        hover: {
            scale: 1.05,
            boxShadow: "0px 0px 8px rgba(48, 127, 251, 0.6)",
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        },
        tap: { scale: 0.98 }
    }

    return (
        <div className='w-[90%] mx-auto fixed top-0 bg-white z-99'>

            {/* Main navbar */}
            <motion.nav
                className='w-full'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className='w-full max-w-[1300px] mx-auto px-4'>
                    <div className='flex justify-between items-center py-3'>
                        {/* Logo */}
                        <motion.div
                            className='flex items-center'
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <Image
                                src={logo}
                                width={50}
                                height={50}
                                alt="logo Image"
                                priority
                            />
                        </motion.div>


                    </div>

                    {/* Mobile Menu with AnimatePresence */}
                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                className='md:hidden overflow-hidden'
                                variants={menuVariants}
                                initial="closed"
                                animate="open"
                                exit="closed"
                            >
                                <motion.ul className='flex flex-col gap-2 py-4'>
                                    {buttons.map((item, index) => (
                                        <motion.li
                                            key={index}
                                            variants={{
                                                closed: { opacity: 0, y: 20 },
                                                open: {
                                                    opacity: 1,
                                                    y: 0,
                                                    transition: {
                                                        duration: 0.4,
                                                        delay: index * 0.1
                                                    }
                                                }
                                            }}
                                        >
                                            <motion.div
                                                className={
                                                    item === 'BOOK ONLINE NOW'
                                                        ? 'bg-[#1115ac] rounded-xl text-white px-4 py-3 text-center cursor-pointer'
                                                        : 'text-[#307ffb] text-center py-3 cursor-pointer rounded-lg'
                                                }
                                                whileHover={item === 'BOOK ONLINE NOW' ?
                                                    { scale: 1.03, backgroundColor: "#1a56db" } :
                                                    { backgroundColor: "rgba(239, 246, 255, 0.7)" }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                {item}
                                            </motion.div>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.nav>
        </div>
    )
}

export default Navbar
