import React from 'react';

const sendDataToPHP = () => {
  const generateRandomData = () => {
    // Rasgele lat ve long değerleri oluşturma (-90 ile 90 arasında)
    const lat = (Math.random() * 180 - 90).toFixed(6);
    const long = (Math.random() * 180 - 90).toFixed(6);
  
    // Rasgele deprem büyüklüğü oluşturma (0 ile 10 arasında)
    const mag= (Math.random() * 10).toFixed(1);

  
    // Rasgele tarih oluşturma (1 Ocak 1970'den bu yana geçen milisaniye cinsinden)
    const randomDate = new Date(Math.random() * Date.now());
    const date = `${randomDate.getDate().toString().padStart(2, '0')}/${(randomDate.getMonth() + 1).toString().padStart(2, '0')}/${randomDate.getFullYear()}`;
  
    // Rasgele derinlik oluşturma (0 ile 1000 arasında)
    const depth = (Math.random() * 1000).toFixed(1);
  
    // Rasgele zaman oluşturma (milisaniye cinsinden günün belirli bir saati)
    const hours = Math.floor(Math.random() * 24).toString().padStart(2, '0');
    const minutes = Math.floor(Math.random() * 60).toString().padStart(2, '0');
    const time = `${hours}.${minutes}`;
  
    return {
      lat,
      long,
      mag,
      date,
      depth,
      time
    };
  };

  const randomData = generateRandomData();

  // Verileri PHP'ye gönderme kodu
  fetch('http://localhost/quakify/backend/addData.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(randomData)
  })
  .then(response => {
    if (response.ok) {
      alert('Veri başarıyla gönderildi.', );
    } else {
      alert('Veri gönderilirken bir sdfasdfhata oluştu.');
    }
  })
  .catch(error => {
    alert('İstek sırasında bir hata oluştu:', error);
  });
};

const MyComponent = () => {
  return (
    <a href='#' onClick={sendDataToPHP} className='w-[380px] h-[230px] bg-[#FF3131] rounded-3xl mr-[288px] float-right mt-24 pt-16 text-white inter text-[40px] text-center'>Add Random Quake</a>
  );
};

export default MyComponent;
