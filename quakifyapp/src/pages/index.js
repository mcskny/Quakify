import React, { useEffect, useState } from "react";
import '../App.css';
import Component from '../components/Component';
import Navbar from '../components/Navbar';
import Panel from '../components/rightpanel';
import Map from '../components/Map';
import axios from 'axios';

const Home = () => {
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


    return (
        <div>
            <Navbar />
      <div id="main" className='float-right w-[20%] inline-block'>
        <Panel quak={quak} />
        <Component  quak={quak} />
      </div>
      <Map id="child"/>
        </div>
    );
};
 
export default Home;
