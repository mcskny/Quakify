import { useState } from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "./pages/Contact";
import Links from "./pages/Links";
import Navbar from "./components/Navbar";
import Map from "./components/Map";

function App() {
  const [sortType, setSortType] = useState("default");
  const [showMap, setShowMap] = useState(false);
  const [dateFilter, setDateFilter] = useState("");
  const [selectedMobileQuake, setSelectedMobileQuake] = useState(null);
  
  return (
    <div className="min-h-screen overflow-y-auto">
      <Router>
        {/* Navbar is displayed on all pages */}
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home sortType={sortType} setSortType={setSortType} dateFilter={dateFilter} setDateFilter={setDateFilter} />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/links" element={<Links />} />
        </Routes>
        <Map showMap={showMap} dateFilter={dateFilter} onQuakeSelectMobile={setSelectedMobileQuake} />
      </Router>
    </div>
  );
}

export default App;
