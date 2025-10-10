import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
return (
    <header className="header">
        <div className="container">
        <Link to="/" className="logo">TutorPro</Link>
        <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/subjects">Subjects</Link>
            <Link to="/schedule">Schedule</Link>
            <Link to="/contact">SubStack Blogs</Link>
            <Link to="/contact">Contact</Link>
        </nav>
        </div>
    </header>
);
};

export default Header;