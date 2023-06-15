import React from "react";
import { Link } from "react-router-dom";


const HomePage = (props) => {
    
    return (
        <div>
            <div>
                <h2>Your Favorite Food, Delivered While Coding!</h2>
                <Link to="/pizza" id="order-pizza">Order Here</Link>
           </div>
            <div>
                <h3>Pizza Delivery in Every City!</h3>
            </div>
        </div>
        
    )
}

export default HomePage;