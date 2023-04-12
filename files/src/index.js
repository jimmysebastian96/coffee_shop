import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Rewards from './Rewards';
import Home from './home';
import Register from './register';
import Dashboard from './dashboard';
import {BrowserRouter as Router} from 'react-router-dom'
import { Route, Routes} from "react-router";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
       <Routes>
        <Route index element={<Home />} />
        <Route path="Rewards" element={<Rewards />} />
        <Route path="register" element={<Register />} />
        <Route path="App" element={<App />} />
        <Route path="dashboard" element={<Dashboard />} />
       </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
