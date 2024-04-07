import React from 'react'
const listMag = '3.0';
const RightPanel = ({ quak }) => {


  return (
    <div className='float-right r-0 overflow-hidden bg-[#303030] w-[100%] xl:h-[200px] 2xl:h-[250px]'>
      <p className='ml-2 xl:ml-10 2xl:ml-7 w-[275px] inter text-[#D2D2D2] m-auto pt-12 text-[14pt] xl:text-[16pt] 2xl:text-[20pt]'>Last earthquakes,</p> 
      <div className='ml-2 xl:ml-10 2xl:ml-7 w-[275px] inter text-[#D2D2D2] m-auto text-[14pt] xl:text-[16pt] 2xl:text-[20pt]'>in this 
        <div className='float-right mr-[135px] xl:mr-[125px] 2xl:mr-16' >
          <select className="w-[80px] 2xl:w-[121px] bg-[#202020] text-[#D2D2D2] text-[12pt] 2xl:text-[20pt] xl:h-[30px] 2xl:h-[40px]">
            <option>week</option>
            <option>month</option>
            <option>year</option>
          </select>
        </div>
        <div className='w-[300px] text-[12pt] xl:text-[20px] inter-light'> {quak.length} earthquakes ({listMag}+)</div>
      </div>
      <div className='float-right mr-4 xl:mt-5 2xl:mt-10 mb-2'>
              <select className="w-[130px] inter-light bg-[#202020] text-[#D2D2D2] text-[12pt] h-[30px]">
                <option>Largest First</option>
                <option>Newest First</option>
                <option>Oldest First</option>
              </select>
      </div>
    </div>
  );
}

export default RightPanel;
