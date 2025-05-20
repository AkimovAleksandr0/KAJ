// Header component that includes the site title, navigation links, and buttons for browser history navigation.
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaCar, FaEnvelope, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Icon } from "../assets/icon.jsx";

const Header = () => {
    const navigate = useNavigate();

    return (
        <header>
            <div className="header-container">
                <Icon className="header-icon"/>
                <h1>Car Dealer</h1>
            </div>
            <nav aria-label="Main navigation">
                <ul>
                    {/* Buttons for navigating back and forward in browser history */}
                    <li>
                        <button onClick={() => navigate(-1)} aria-label="Go back"><FaArrowLeft /></button>
                        <button onClick={() => navigate(1)} aria-label="Go forward"><FaArrowRight /></button>
                    </li>
                    {/* Navigation links to main pages */}
                    <li><Link to="/"><FaHome className={"IconHead"} /> Main Page</Link></li>
                    <li><Link to="/add-car"><FaCar className={"IconHead"} /> Add Car</Link></li>
                    <li><Link to="/media"><FaEnvelope className={"IconHead"} /> Media</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;