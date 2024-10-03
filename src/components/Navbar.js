import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
const Navbar = () => {
  return (
    <nav>
      <h2>Electricity Connection Management</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/view-connections">View Connections</Link></li>
        <li><Link to="/charts">Charts</Link></li>
        <li><Link to="/add-user">Add User</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
