import React, { useState } from 'react'
import { FaBars, FaTimes } from "react-icons/fa"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className='bg-slate-800 text-white'>
      <div className="flex justify-between items-center px-4 py-5 h-14">
        
        
        <div className='logo flex items-center font-bold text-white text-2xl'>
        <img className='h-10' src="/favicon/5850971.png" alt="" />
          <span className='text-green-500'>&lt;</span>
          <span>Pass</span>
          <span className='text-green-500'>OP/&gt;</span>
        </div>

        {/* Desktop Menu */}
        <ul className='hidden md:flex gap-6'>
          <li><a className='hover:text-green-400 transition-all' href='#'>Home</a></li>
          <li><a className='hover:text-green-400 transition-all' href='#'>About</a></li>
          <li><a className='hover:text-green-400 transition-all' href='#'>Contact</a></li>
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden z-50">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-slate-700 text-center py-4 space-y-4 animate-slideDown">
          <a href="#" className="block text-lg hover:text-green-400">Home</a>
          <a href="#" className="block text-lg hover:text-green-400">About</a>
          <a href="#" className="block text-lg hover:text-green-400">Contact</a>
        </div>
      )}
    </nav>
  )
}

export default Navbar
