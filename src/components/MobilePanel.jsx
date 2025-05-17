// Component for the mobile bottom panel
// Handles switching between map and list views on mobile
// Displays selected earthquake details when available
import React from 'react';

// MobilePanel functional component receiving props for state management and selected quake data
const MobilePanel = ({ showMap, setShowMap, setShowList, sortType, setSortType, dateFilter, setDateFilter, selectedMobileQuake }) => {

    // Handler to open the map view (primarily on mobile)
    const handleOpenMap = (event) => {
        event.preventDefault(); // Prevent default link behavior
        if (window.innerWidth > 640) return; // Only apply on mobile screens ( Tailwind's sm breakpoint is 640px)

        const mainContent = document.getElementById('main-content'); // Get the main content div (where map is)
        if (mainContent && window.innerWidth <= 640) {
            mainContent.classList.remove('hidden'); // Show the map div
        }

        setShowList(false); // Hide the list view
        setShowMap(true);   // Show the map view
    };

    // Handler to switch back to the list view (primarily on mobile)
    const handleBackToList = (event) => {
        event.preventDefault(); // Prevent default link behavior
        if (window.innerWidth > 640) return; // Only apply on mobile screens

        const mainContent = document.getElementById('main-content'); // Get the main content div
        if (mainContent && window.innerWidth <= 640) {
            mainContent.classList.add('hidden'); // Hide the map div
        }

        setShowList(true); // Show the list view
        setShowMap(false); // Hide the map view
    };

    // Handler for sorting option change
    const handleSortChange = (e) => {
        setSortType(e.target.value); // Update sort type state
    };

    // Handler for date filter change
    const handleDateFilterChange = (e) => {
        setDateFilter(e.target.value); // Update date filter state
    };

    // If showMap is true, display the button to open the quake list
    if (showMap) {
        return (
            // Fixed bottom panel for map view
            <div className="fixed z-50 bottom-0 bg-[#202020] rounded-t-2xl h-[100px] w-full flex justify-center items-center sm:hidden">
                {/* Button to switch back to list */}
                <a
                    className="p-2 inter bg-[#303030] w-[80%] text-white flex text-xl justify-center rounded-2xl"
                    href="#"
                    onClick={handleBackToList} 
                >
                    Open Quake List
                </a>
            </div>
        );
    }

    // If showMap is false, display the filter controls and the button to open the map
    return (
        // Main container div for the mobile panel (visible on small screens)
        <div className='block sm:hidden'>
            {/* Top bar with disclaimer */}
            <div className="w-full h-[60px] bg-[#303030] rounded-b-2xl">
                <div className='h-full flex justify-center items-center'>
                    <a className='inter text-[#909090] text-[15px]' >This is a demo project. All data is fictitious.</a>
                </div>
            </div>
            {/* Container for filter dropdowns */}
            <div className="w-full z-10 h-[110px] mt-10 bg-[#303030] rounded-t-2xl">
                <div className='flex justify-center top-0 h-[85%] items-center w-full'>
                    {/* Sort type dropdown */}
                    <select 
                        className='text-[#D2D2D2] text-[12pt] bg-[#202020] rounded-lg inter-light p-2'
                        value={sortType}
                        onChange={handleSortChange}
                    >
                        <option value="newest">Latest First</option>
                        <option value="largest">Biggest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>
                    {/* Spacer */}
                    <div className='w-10'/>
                    {/* Date filter dropdown */}
                    <select 
                        className='text-[#D2D2D2] text-[12pt] bg-[#202020] rounded-lg inter-light p-2'
                        value={dateFilter}
                        onChange={handleDateFilterChange}
                    >
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="year">This Year</option>
                    </select>
                </div>
            </div>

            {/* Fixed bottom panel for list view - shows quake details or map button */}
            <div id="bottom panel" className="fixed z-50 bottom-0 bg-[#202020] rounded-t-2xl h-[100px] w-full">
                <div className='h-full flex justify-center items-center'>
                    {/* selectedMobileQuake varsa deprem detayını göster, yoksa butonu göster */}
                    {selectedMobileQuake ? (
                        // Display selected earthquake details
                        <div className="flex m-0 p-0 float-right right-0 w-[100%] h-[55px]">
                            {/* Magnitude circle */}
                            <div className='bg-[#909090] text-center mr-3.5 rounded-3xl w-[45px] h-[45px] m-[7px]'>
                                <p className='inter-bold text-[20px] pt-1.5 text-gray-800 '>{selectedMobileQuake.magnitude}</p>
                            </div>
                            {/* Location (City, Country) */}
                            <div className='relative w-[170px] xl:mt-3 mt-4 whitespace-nowrap h-10 inter text-[16px] xl:text-[20px] text-[#D2D2D2]'>
                                {selectedMobileQuake.city || "Yükleniyor..."}
                            </div>
                            {/* Date, Depth, Time */}
                            <div className='text-[#6C6C6C] bg-gradient-to-r from-[#00000000] via-[#202020] via-10% to-[#202020] pl-4 right-0 ml-4'>
                                <p className='w-[100px] mt-2 h-4 block inter text-[14px] text-[#6C6C6C]'>{selectedMobileQuake.date}</p>
                                <p className='w-[70px] h-5 inline-block inter text-[14px] text-[#6C6C6C]'>{selectedMobileQuake.depth} Km</p>
                                <p className='w-[45px] h-5 inline-block inter text-[14px] text-[#6C6C6C]'>{selectedMobileQuake.time}</p>
                            </div>
                        </div>
                    ) : (
                        // Button to open the map
                        <a
                            className="p-2 inter bg-[#303030] w-[80%] text-white flex text-xl justify-center rounded-2xl"
                            href="#"
                            onClick={handleOpenMap}
                        >
                            Open Map
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

// Export the component for use in other parts of the application
export default MobilePanel;