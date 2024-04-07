import Navbar from '../components/Navbar';
import React, { useEffect, useState } from "react";
import Component from '../components/Component';

import AddQuake from '../components/AddQuake';
import '../App.css';
import axios from 'axios';

export const AddQuakeData = () => {
    const [quak, setQuak] = useState([]);
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost/quakify/backend/api.php');
        setQuak(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
    return(
        <div>
            
        <Navbar />
        
        <AddQuake/>
        <div id="main" className='border-[#303030] border-solid border-8 rounded-xl float-right w-[20%] fixed bottom-24 right-72 h-[450px]'>
        <Component  quak={quak} />
        </div>
    </div>
    )
   
}

export default AddQuakeData