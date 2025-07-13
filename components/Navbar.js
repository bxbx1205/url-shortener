import React from 'react'
import Link from 'next/link';


function Navbar() {
    return (
        <nav className='h-16 bg-purple-700 flex items-center justify-between px-4'>
            <div className="logo">Shortener</div>
            <ul className='flex space-x-4'>
                <Link href="/" className='text-white'>Home</Link>
                <Link href="/about" className='text-white'>About</Link>
                <Link href="/features" className='text-white'>Shortener</Link>
                <Link href="/contact" className='text-white'>Contact</Link>
                <li className='flex space-x-2'>
                    <Link href="/generate" className='text-white'><button className='bg-purple-500 shadow-lg rounded-lg p-2 py-1'>Try now</button></Link>
                    <Link href="/github" className='text-white'><button className='bg-gray-500 shadow-lg rounded-lg p-2 py-1'>Github</button></Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar