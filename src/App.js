import React from 'react';
import HomePage from './Components/HomePage';
import Pizza from './Components/Pizza';

import { Route, Link, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className="Header">
      <h1>BloomTech Eats</h1>
      <nav>
        <Link to="/">Home</Link>&nbsp;
        <Link to="/help">Help</Link>&nbsp;
      </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pizza" element={<Pizza />} />
        </Routes>
    
    </div>
  );
};

export default App;
