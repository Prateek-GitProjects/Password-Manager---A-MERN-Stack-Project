import React from 'react'
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className='bg-slate-800 text-white w-full shadow-inner border-t border-slate-700 px-6 py-2'>
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3 md:gap-0">
        
        {/* Left (empty for desktop balance) */}
        <div className="hidden md:block"></div>

        {/* Center (logo + text) */}
        <div className='flex flex-col justify-center items-center text-center space-y-1'>
          <div className='logo font-bold text-white text-2xl'>
            <span className='text-green-500'>&lt;</span>
            <span>Pass</span>
            <span className='text-green-500'>OP/&gt;</span>
          </div>

          <div className='flex justify-center items-center text-sm'>
            Created with 
            <FaHeart className="text-red-500 mx-2 animate-pulse" />
            by Prateek
          </div>
        </div>

        {/* Right (social links + copyright) */}
        <div className="flex flex-col md:items-end items-center space-y-2">
          <div className='flex space-x-3'>
            <a href="https://github.com" target="_blank" rel="noreferrer"
              className="p-2 rounded-full bg-slate-700 hover:bg-green-500 transition-all duration-300">
              <FaGithub className="text-xl" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"
              className="p-2 rounded-full bg-slate-700 hover:bg-green-500 transition-all duration-300">
              <FaLinkedin className="text-xl" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"
              className="p-2 rounded-full bg-slate-700 hover:bg-green-500 transition-all duration-300">
              <FaTwitter className="text-xl" />
            </a>
          </div>

          <div className='text-xs text-gray-400 text-center md:text-right'>
            © {new Date().getFullYear()} PassOP. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
