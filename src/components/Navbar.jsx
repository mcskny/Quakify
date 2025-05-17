import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getBackgroundColor = (path) => {
    return location.pathname === path ? 'bg-[#303030]' : 'bg-[#202020] hover:bg-[#303030]';
  };

  return (
    <div className='bg-[#202020] pt-0 mt-0 w-full h-[50px] 2xl:h-[71px]'>
      <div className='table-cell w-12 h-1'></div>
      <a href="/" className="ml-0 left-0 min-w-[171px] text-center table-fixed table-cell align-middle">
        <img alt="Logo" className='w-[122px] 2xl:w-[172px] h-[50px] 2xl:h-[71px] mt-0 pt-0' src="https://quakify.mcskn.com/Logo.png"/>
      </a>
      <div className='table-cell w-24 h-1'></div>
      <a href='/' className={`${getBackgroundColor('/')} ml-[150px] text-center sm:hidden xl:table-cell align-middle w-[300px] xl:h-[50px] 2xl:h-[71px]`}>
        <p className='inter text-[#D2D2D2] xl:text-[20pt] 2xl:text-[24pt]'>Home</p>
      </a>
      <a href='/contact' className={`${getBackgroundColor('/contact')} sm:hidden xl:table-cell text-center align-middle w-[300px] xl:h-[50px] 2xl:h-[71px]`}>
        <p className='inter text-[#D2D2D2] xl:text-[20pt] 2xl:text-[24pt]'>Contact</p>
      </a>
      <a href='/links' className={`${getBackgroundColor('/links')} sm:hidden xl:table-cell text-center align-middle w-[300px] xl:h-[50px] 2xl:h-[71px]`}>
        <p className='inter text-[#D2D2D2] xl:text-[20pt] 2xl:text-[24pt]'>Relevant Links</p>
      </a>
      <div className='table-cell w-64 h-1'></div>
      <div className='table-cell mr-12 w-[20px] h-1'>
        <button 
          id='hamburger-button' 
          className='xl:hidden fixed top-2 right-10 z-50'
          onClick={toggleMenu}
        >
          <div className='h-1 w-9 mt-[6px] rounded-full bg-[#D2D2D2]'/>
          <div className='h-1 w-9 mt-[6px] rounded-full bg-[#D2D2D2]'/>
          <div className='h-1 w-9 mt-[6px] rounded-full bg-[#D2D2D2]'/>
        </button>
      </div>

      {/* Mobil Menü */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-[#202020] transform transition-transform duration-300 ease-in-out z-40 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className='flex flex-col pt-20 px-6'>
          <a href="/" className={`text-[#D2D2D2] text-xl py-4 hover:text-white transition-colors ${location.pathname === '/' ? 'text-white' : ''}`}>Home</a>
          <a href="/contact" className={`text-[#D2D2D2] text-xl py-4 hover:text-white transition-colors ${location.pathname === '/contact' ? 'text-white' : ''}`}>Contact</a>
          <a href="/links" className={`text-[#D2D2D2] text-xl py-4 hover:text-white transition-colors ${location.pathname === '/links' ? 'text-white' : ''}`}>Relevant Links</a>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className='fixed inset-0 bg-black bg-opacity-50 z-30 xl:hidden'
          onClick={toggleMenu}
        />
      )}
    </div>
  )
}

export default Navbar