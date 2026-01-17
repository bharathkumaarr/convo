import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'

function Landing() {
  return (
    <div className='h-full w-full bg-linear-to-t from-[#0b1f2a] from-0% via-[#132f3d] via-25% to-[#eef2f5] to-100% flex justify-center items-center font-mono select-none relative overflow-hidden' 
    >
        <Navbar />
        <Hero />

        <div className="pointer-events-none absolute inset-0 opacity-100 "
            style={{
            backgroundImage:
                `repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 12px) `
                }}
        />
        <div className="pointer-events-none absolute inset-0"
            style={{
            background:
            'radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 85%)'
                }}
        />

      <button className='p-2 pl-4 pr-4 rounded-full bg-[#eef2f5] text-black text-l absolute bottom-30 hover:bg-[#bac5ca] transition-all duration-600 ease-in-out hover:scale-110 hover:pl-8 hover:pr-8 cursor-pointer'>Get Started</button>
    </div>
  )
}

export default Landing
