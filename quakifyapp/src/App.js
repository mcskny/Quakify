
import Home from "./pages";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AddData from "./pages/AddQuakeData";

function App() {
  
  
  return (
    
    <div>
      
      <Router>
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/AddQuakeData" element={<AddData />} /></Routes>
    </Router>
    </div>
    
  );
}

export default App;
