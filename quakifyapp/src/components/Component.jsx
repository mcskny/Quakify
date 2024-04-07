import React, { useEffect} from "react";

const Component = ({ quak }) => {
  useEffect(() =>{

    
  });
  return (
    <div className="   overflow-scroll  w-[100%] h-[620px]">
      {quak.map((quake, index) => (
        <div key={index} className={quake.id%2===0?"bg-[#303030] flex m-0 p-0 float-right right-0 w-[100%] h-[55px]":"bg-[#202020] flex m-0 p-0 float-right right-0 w-[100%] h-[55px]"}  >
        <div className='bg-[#909090] text-center mr-3.5 rounded-3xl w-[41px] h-[41px] m-[7px]'>
          <p className='inter-bold text-[20px] pt-1.5 text-gray-800 '>{quake.magnitude}</p>
        </div>
        <p className='w-[170px] xl:mt-3 mt-4 whitespace-nowrap h-10 inter text-[16px] xl:text-[20px] text-[#D2D2D2]'>{quake.coordinates}</p>
        <div key={index} className={quake.id%2===0?'text-[#6C6C6C] 2xl:block hidden  bg-gradient-to-r from-[#00000000] via-[#303030] via-10% to-[#303030]  pl-4 right-0 ml-4':'text-[#6C6C6C] 2xl:block hidden  bg-gradient-to-r from-[#00000000] via-[#202020] via-10% to-[#202020] pl-4  right-0 ml-4'}>
        <p className='w-[100px] mt-2  h-4 block inter text-[14px] text-[#6C6C6C]'>{quake.date}</p>
        <p className='w-[70px]  h-5 inline-block inter text-[14px] text-[#6C6C6C]'>{quake.depth} Km</p>
        <p className='w-[45px]  h-5 inline-block inter text-[14px] text-[#6C6C6C]'>{quake.time}</p>
        </div>
      </div>
      ))}
    </div>
    



  );
};

export default Component;
