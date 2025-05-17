import React, { useState } from 'react';
import Random from './MyComponent';

const AddQuake = () => {
    const [mag, setMag] = useState('');
  const [depth, setDepth] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!mag || !depth || !date || !time || !lat || !long) {
        alert('Lütfen tüm alanları doldurun.');
        return;
      }
      if (isNaN(mag) || isNaN(depth) || isNaN(lat) || isNaN(long)) {
        alert('Magnitude, Depth, Latitude ve Longitude alanlarına sadece sayısal değerler girilmelidir.');
        return;
      }
    const formData = {
      mag,
      depth,
      date,
      time,
      lat,
      long
    };
    try {
        const response = await fetch('http://localhost/quakify/backend/AddData.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        if (response.ok) {
          alert('Veri başarıyla gönderildi.');
        } else {
            alert('Veri gönderilirken bir hata oluştu.');
        }
      } catch (error) {
        alert('İstek sırasında bir hata oluştu:', error);
      }
    };


  return (
    <div>
        <Random></Random>
    <div className='w-[863px] h-[729px] bg-[#303030] rounded-3xl ml-32 mt-20'>
    <h1 className='ml-24 m-8 inter text-white text-[82px]'>Add Quake Data</h1>
    <form className='m-auto mt-12 w-[700px] h-[450px]' onSubmit={handleSubmit}>
      <input value={mag} onChange={(e) => setMag(e.target.value)} placeholder="Magnitude" className='rounded-xl p-1 text-[#6C6C6C] inter m-5 text-[32px] w-72' type="text" />
      <input value={depth} onChange={(e) => setDepth(e.target.value)} placeholder="Depth" className='rounded-xl p-1 text-[#6C6C6C] inter m-5 text-[32px] w-72' type="text" />
      <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" className='rounded-xl p-1 text-[#6C6C6C] inter m-5 text-[32px] w-72' type="date" />
      <input value={time} onChange={(e) => setTime(e.target.value)} placeholder="Time" className='rounded-xl p-1 text-[#6C6C6C] inter m-5 text-[32px] w-72' type="time" />
      <input value={lat} onChange={(e) => setLat(e.target.value)} placeholder="Lat" className='rounded-xl p-1 text-[#6C6C6C] inter m-5 text-[32px] w-72' type="text" />
      <input value={long} onChange={(e) => setLong(e.target.value)} placeholder="Long" className='rounded-xl p-1 text-[#6C6C6C] inter m-5 text-[32px] w-72' type="text" />
      <input className='bg-[#202020] cursor-pointer rounded-xl p-1 text-[#FFFFFF] inter m-5 ml-44 text-[32px] w-72' type="submit" value="Submit Data" />
    </form>

    </div>
    

    </div>
    )
    
}

export default AddQuake