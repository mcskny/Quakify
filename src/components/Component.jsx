import React, { useEffect, useState } from "react";

// Ortam değişkenini kullan
const MAPTILER_API_KEY = process.env.REACT_APP_MAPTILER_API_KEY;

const getCityCountry = async (coordinates) => {
  // ... (getCityCountry fonksiyonu aynı kalacak)
  if (!coordinates) return "";
  const [lon, lat] = coordinates.split(',').map(c => c.trim());
  try {
    const response = await fetch(
      `https://api.maptiler.com/geocoding/${lon},${lat}.json?key=${MAPTILER_API_KEY}&language=en`
    );
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      const context = data.features[0].context || [];
      let city = context.find(c => c.id.startsWith("place"))?.text || "";
      let country = context.find(c => c.id.startsWith("country"))?.text || "";
      city = city.replace(/[^A-Za-z0-9 ,.-]/g, "");
      country = country.replace(/[^A-Za-z0-9 ,.-]/g, "");
      if (city && country) return `${city}, ${country}`;
      let placeName = data.features[0].place_name || "";
      placeName = placeName.replace(/[^A-Za-z0-9 ,.-]/g, "");
      return placeName;
    }
    return "";
  } catch {
    return "";
  }
};

const Component = ({ quak, className }) => {
  const [locations, setLocations] = useState({});
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      const locs = {};
      await Promise.all(
        quak.map(async (quake) => {
          if (quake.coordinates) {
            locs[quake.id] = await getCityCountry(quake.coordinates);
          }
        })
      );
      setLocations(locs);
    };
    if (quak.length > 0) fetchLocations();
  }, [quak]);

  const combinedClassName = `overflow-scroll w-[100%]   ${className || ''}`;

  return (
    <div className={combinedClassName}>
      {quak.map((quake, index) => (
        <div
          key={index}
          className={index % 2 === 0 ? "bg-[#202020] flex m-0 p-0 float-right right-0 w-[100%] h-[55px]" : "bg-[#303030] flex m-0 p-0 float-right right-0 w-[100%] h-[55px]"}
        >
          <div className='bg-[#909090] text-center mr-3.5 rounded-3xl w-[45px] h-[45px] m-[7px]'>
            <p className='inter-bold text-[20px] pt-1.5 text-gray-800 '>{quake.magnitude}</p>
          </div>
          <div
            className='relative w-[170px] xl:mt-3 mt-4 whitespace-nowrap h-10 inter text-[16px] xl:text-[20px] text-[#D2D2D2]'
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {locations[quake.id] ? locations[quake.id] : "Yükleniyor..."}
            {hoveredIndex === index && (
              <span
                className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-[#222] text-white px-3 py-1 rounded shadow-lg z-10 text-[15px] whitespace-nowrap"
              >
                {locations[quake.id]}
              </span>
            )}
          </div>
          <div className={index % 2 === 0 ? 'text-[#6C6C6C] bg-gradient-to-r from-[#00000000] via-[#202020] via-10% to-[#202020]  pl-4 right-0 ml-4' : 'text-[#6C6C6C]  bg-gradient-to-r from-[#00000000] via-[#303030] via-10% to-[#303030] pl-4  right-0 ml-4'}>
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