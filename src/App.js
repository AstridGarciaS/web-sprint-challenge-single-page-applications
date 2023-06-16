import React from 'react';
import HomePage from './Components/HomePage';
import PizzaForm from './Components/PizzaForm';
import { Route, Link, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className="Header">
      <h1>BloomTech Eats</h1>
      <nav>
        <Link to="/"><button>Home</button></Link>&nbsp;
        <Link to="/order">
        <button className='order-pizza'>Help</button>  
        </Link>&nbsp;
      </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pizza" element={<PizzaForm />} />
        </Routes>
    
    </div>
  );
};

export default App;
