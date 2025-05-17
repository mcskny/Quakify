import React, { useEffect, useState } from "react";
import '../App.css';
import Component from '../components/Component';
import Panel from '../components/rightpanel';
import MobilePanel from '../components/MobilePanel';
import Map from '../components/Map';
import axios from 'axios';

const Home = ({sortType, setSortType}) => {
    const [quak, setQuak] = useState([]);
    const [selectedMag, setSelectedMag] = useState(2.0);
    const [showMap, setShowMap] = useState(false); 
    const [showList, setShowList] = useState(false); 
    const [dateFilter, setDateFilter] = useState("week");
    const [selectedMobileQuake, setSelectedMobileQuake] = useState(null);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://quakify.mcskn.com/backend/api.php');
                setQuak(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    function dateStringToComparable(str) {
        const [year, month, day] = str.split('-');
        return `${year}${month.padStart(2, '0')}${day.padStart(2, '0')}`;
    }

    function getDateNDaysAgo(n) {
        const d = new Date();
        d.setDate(d.getDate() - n);
        return d;
    }
    function isDateInRange(quakeDateStr, fromDate, toDate) {
        const quakeDate = new Date(quakeDateStr);
        return quakeDate >= fromDate && quakeDate <= toDate;
    }

    let filteredQuak = quak.filter(q => parseFloat(q.magnitude) >= selectedMag);

    const now = new Date();
    if (dateFilter === "week") {
        const weekAgo = getDateNDaysAgo(7);
        filteredQuak = filteredQuak.filter(q => isDateInRange(q.date, weekAgo, now));
    } else if (dateFilter === "month") {
        const monthAgo = getDateNDaysAgo(30);
        filteredQuak = filteredQuak.filter(q => isDateInRange(q.date, monthAgo, now));
    } else if (dateFilter === "year") {
        const yearAgo = getDateNDaysAgo(365);
        filteredQuak = filteredQuak.filter(q => isDateInRange(q.date, yearAgo, now));
    }

    const sortedQuak =  [...filteredQuak].sort((a, b) => {
        if (sortType === "largest") return b.magnitude - a.magnitude;
        if (sortType === "oldest") return dateStringToComparable(a.date) - dateStringToComparable(b.date);
        if (sortType === "newest") return dateStringToComparable(b.date) - dateStringToComparable(a.date);
        return 0;
    });

    return (
        <div>
            <MobilePanel 
                setShowMap={setShowMap} 
                showMap={showMap} 
                setShowList={setShowList}
                sortType={sortType}
                setSortType={setSortType}
                dateFilter={dateFilter}
                setDateFilter={setDateFilter}
                selectedMobileQuake={selectedMobileQuake}
            />

            <Component
                className={`z-20 mt-[-20px] block sm:hidden overflow-hidden rounded-t-3xl h-[680px] ${showMap ? 'hidden' : ''}`}
                quak={sortedQuak}
            />

            <div id="main" className='float-right w-[20%] sm:w-[50%] md:w-[40%] lg:w-[35%] xl:w-[20%] inline-block'>
              <Panel
                quak={sortedQuak}
                setSortType={setSortType}
                selectedMag={selectedMag}
                setSelectedMag={setSelectedMag}
                dateFilter={dateFilter}
                setDateFilter={setDateFilter}
              />
              <Component className='hidden sm:block w-full overflow-hidden h-[640px]' quak={sortedQuak} />
            </div>
            <Map showMap={showMap} onQuakeSelectMobile={setSelectedMobileQuake} quak={sortedQuak} />
        </div>
    );
};

export default Home;