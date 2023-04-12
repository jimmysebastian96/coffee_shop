import "./style.css";
import { Navigate } from "react-router-dom";
import { useState } from 'react';

const Home = () => {
    const [navigateToPage1, setNavigateToPage1] = useState(false);
    const [navigateToPage2, setNavigateToPage2] = useState(false);
    const [navigateToPage3, setNavigateToPage3] = useState(false);
  
    const handleNavigateToPage1 = () => {
      setNavigateToPage1(true);
    };
  
    const handleNavigateToPage2 = () => {
      setNavigateToPage2(true);
    };
  
    const handleNavigateToPage3 = () => {
      setNavigateToPage3(true);
    };
  
    if (navigateToPage1) {
      return <Navigate to="/Register" />;
    }
  
    if (navigateToPage2) {
      return <Navigate to="/Dashboard" />;
    }
  
    if (navigateToPage3) {
      return <Navigate to="/Rewards" />;
    }
  
    return (
      <div>
        <h1>Welcome to the Home Page</h1>
        <button onClick={handleNavigateToPage1}>Register</button>
        <button onClick={handleNavigateToPage2}>Dashboard</button>
        <button onClick={handleNavigateToPage3}>Rewards</button>
      </div>
    )

};
export default Home;