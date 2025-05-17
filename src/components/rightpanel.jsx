import React from 'react'

// Helper function to get a date n days ago
// This function is also present in Home.js, could be moved to a utility file if used more widely.
const getDateNDaysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
};

// Helper function to check if a quake date is within a given date range
// Assumes quakeDateStr is in YYYY-MM-DD format from the database
const isDateInRange = (quakeDateStr, fromDate, toDate) => {
  // The date string from the database is now YYYY-MM-DD
  const quakeDate = new Date(quakeDateStr); // Convert YYYY-MM-DD string to Date object
  // Check if the quake date is within the specified range (inclusive)
  return quakeDate >= fromDate && quakeDate <= toDate;
};

// RightPanel functional component receiving props for earthquake data and state management
const RightPanel = ({ quak, setSortType, selectedMag, setSelectedMag, dateFilter, setDateFilter }) => {
  // Handler for sort type change
  const handleSortChange = (e) => {
    const value = e.target.value; // Get the selected value from the dropdown
    // Set the sort type based on the selected value
    if (value === "Largest First") setSortType("largest");
    else if (value === "Newest First") setSortType("newest");
    else if (value === "Oldest First") setSortType("oldest");
  };

  // Handler for magnitude filter change
  const handleMagChange = (e) => {
    // Set the selected magnitude filter (parse value to float)
    setSelectedMag(parseFloat(e.target.value));
  };

  // Handler for date filter change
  const handleDateFilterChange = (e) => {
    // Set the selected date filter (week, month, year)
    setDateFilter(e.target.value);
  };

  // Apply date filter to the earthquake data received as prop
  let filteredQuak = quak; // Start with the full list (which is already filtered by magnitude and sorted in Home.js)
  const now = new Date(); // Current date for range comparison
  // Filter based on the selected date range
  if (dateFilter === "week") {
    const weekAgo = getDateNDaysAgo(7); // Get date 7 days ago
    filteredQuak = quak.filter(q => isDateInRange(q.date, weekAgo, now)); // Filter quakes within the last week
  } else if (dateFilter === "month") {
    const monthAgo = getDateNDaysAgo(30); // Get date 30 days ago
    filteredQuak = quak.filter(q => isDateInRange(q.date, monthAgo, now)); // Filter quakes within the last month
  } else if (dateFilter === "year") {
    const yearAgo = getDateNDaysAgo(365); // Get date 365 days ago
    filteredQuak = quak.filter(q => isDateInRange(q.date, yearAgo, now)); // Filter quakes within the last year
  }

  // JSX structure for the right panel
  return (
    // Main container div for the right panel (hidden on small screens)
    <div className='hidden sm:block float-right r-0 overflow-hidden bg-[#303030] w-[100%] xl:h-[220px] 2xl:h-[250px]'>
      {/* Title/Heading */}
      <p className='ml-2 xl:ml-10 2xl:ml-7 w-[275px] inter text-[#D2D2D2] m-auto pt-12 text-[14pt] xl:text-[16pt] 2xl:text-[20pt]'>Last earthquakes,</p> 
      {/* Container for filters and count */}
      <div className='ml-2 xl:ml-10 2xl:ml-7 w-[275px] inter text-[#D2D2D2] m-auto text-[14pt] xl:text-[16pt] 2xl:text-[20pt]'>in this 
        {/* Date filter dropdown */}
        <div className='float-right mr-[135px] xl:mr-[125px] 2xl:mr-16' >
          <select
            className="w-[80px] pl-1 2xl:w-[121px] bg-[#202020] text-[#D2D2D2] text-[12pt] 2xl:text-[20pt] xl:h-[30px] 2xl:h-[40px]"
            value={dateFilter}
            onChange={handleDateFilterChange}
          >
            <option value="week">week</option>
            <option value="month">month</option>
            <option value="year">year</option>
          </select>
        </div>
        {/* Spacer div */}
        <div className='h-[10px]'></div>
        {/* Container for earthquake count and magnitude filter */}
        <div className="flex w-[300px] text-[12pt] xl:text-[20px] inter-light">
          {/* Display filtered earthquake count */}
          <div>{filteredQuak.length} earthquakes  </div>
          {/* Spacer div */}
          <div className='w-[10px]'></div>
          {/* Magnitude filter dropdown */}
          <select
            className='w-[65px] pl-1 inter-light bg-[#202020] text-[#D2D2D2] text-[12pt] h-[30px]'
            value={selectedMag}
            onChange={handleMagChange}
          >
            <option value={2.0}>2.0+</option>
            <option value={3.0}>3.0+</option>
            <option value={3.5}>3.5+</option>
            <option value={4.0}>4.0+</option>
            <option value={4.5}>4.5+</option>
            <option value={5.0}>5.0+</option>
          </select>
        </div>
      </div>
      {/* Sort type dropdown */}
      <div className='float-right mr-4 xl:mt-5 2xl:mt-10 mb-2'>
        <select onChange={handleSortChange} className="w-[130px] mt-2 pl-1 xl:mt-0 inter-light bg-[#202020] text-[#D2D2D2] text-[12pt] h-[30px]">
          <option>Largest First</option>
          <option>Newest First</option>
          <option>Oldest First</option>
        </select>
      </div>
      {/* Demo project disclaimer */}
      <div className='z-50 bg-[#303030] p-2 rounded-lg fixed bottom-2 right-5 2xl:text-[#909090] xl:text-[#909090] inter 2xl:text-sm sm:text-xs sm:text-[#202020] xl:text-xs md:text-[#202020] hidden xl:block font-light '>This is a demo project. All data is fictitious.</div>
    </div>
  );
}

// Export the component for use in other parts of the application
export default RightPanel;
