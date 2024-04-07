import React from 'react'

const Navbar = () => {
  return (
    
    <div className='bg-[#202020]  pt-0 mt-0 w-full h-[50px] 2xl:h-[71px]'>
    <div className='table-cell w-12 h-1'></div>
      <a href="/" className=" min-w-[171px] text-center table-fixed table-cell align-middle"><img alt="Logo"className='w-[122px] 2xl:w-[172px] h-[50px] 2xl:h-[71px] mt-0 pt-0'src="./images/logooo.png"/></a>
      <div className='table-cell w-24 h-1'></div>
      <a href='/' className=' bg-[#303030] ml-[150px] text-center sm:hidden xl:table-cell align-middle w-[300px]          xl:h-[50px]  2xl: h-[71px]'><p className='inter   text-[#D2D2D2]        xl:text-[20pt] 2xl:text-[24pt] '>Map</p></a>
      <a href='/AddQuakeData' className=' bg-[#202020] hover:bg-[#303030]    sm:hidden xl:table-cell text-center align-middle w-[300px] xl:h-[50px]  2xl:h-[71px]'><p className='inter text-[#D2D2D2] xl:text-[20pt]  2xl:text-[24pt] '>Add Data</p></a>
      <a href='#' className=' bg-[#202020] hover:bg-[#303030]    sm:hidden xl:table-cell text-center  align-middle w-[300px] xl:h-[50px]  2xl:h-[71px]'><p className='inter text-[#D2D2D2] xl:text-[20pt]  2xl:text-[24pt] '>Contact</p></a>
      <div className='table-cell w-64 h-1'></div>
      <div className='table-cell mr-12 w-[20px] h-1'>
        <div className='xl:hidden fixed top-2 right-10'>
      <div className='h-1 w-10 mt-[4px] rounded-full bg-[#D2D2D2]'/>
      <div className='h-1 w-10 mt-[8px]   rounded-full bg-[#D2D2D2]'/>
      <div className='h-1 w-10 mt-[8px] rounded-full bg-[#D2D2D2]'/>
      </div>
        <a href="/AddQuakeData" className=' cursor-pointer bg-[#303030] w-[60px] pt-1 pb-3.5 pl-3.5 rounded-xl  hidden  xl:block fixed top-2 right-10'>

      <div className='h-1 w-8 mt-[8px] 2xl:mt-[12px] rounded-full bg-[#D2D2D2]'/>
      <div className='h-1 w-8 mt-[7px]   rounded-full bg-[#D2D2D2]'/>
      <div className='h-1 w-8 mt-[7px] rounded-full bg-[#D2D2D2]'/>
      </a>
      </div>

      
      
    </div> 
    
    )
}

export default Navbar