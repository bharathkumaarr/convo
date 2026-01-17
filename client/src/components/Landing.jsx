import React from 'react'
import Navbar from './Navbar'

function Landing() {
  return (
    <div className='h-full w-full bg-linearchrone-to-t 
    from-[#0E232F] from-0% 
    via-[#132B37] via-25% 
    to-white to-100% flex justify-center items-center font-mono'>
        <Navbar />
        




        
      <button className='p-2 pl-4 pr-4 rounded-full bg-white text-black text-l absolute bottom-20 hover:bg-[#436a81] transition-all duration-600 ease-in-out hover:scale-105'>Get Started</button>
    </div>
  )
}

export default Landing
