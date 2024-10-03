import React from 'react';
import './Home.css'; 

const Home = () => {
    return (
        <div className="home-container">
            <div className="header-content"> 
                <h1 className="main-heading"> 
                    Welcome to the <span className="highlight">Electricity Connection Management System</span>
                </h1>
                <p className="subheading">Streamlining electricity connections for a brighter future.</p>
            </div>

            <div className="info-section"> 
                <div className="info-item">
                    <h2 className="info-heading">Efficient Management</h2>
                    <p>Manage electricity connections with ease and transparency.</p>
                </div>
                <div className="info-item">
                    <h2 className="info-heading">Simplified Process</h2>
                    <p>Apply for new connections, track applications, and manage existing ones seamlessly.</p>
                </div>
                <div className="info-item">
                    <h2 className="info-heading">Enhanced Accessibility</h2>
                    <p>Access information and services anytime, anywhere.</p>
                </div>
            </div>

            <div className="image-gallery">
                <img src="https://images.unsplash.com/photo-1413882353314-73389f63b6fd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Electricity" />
                <img src="https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Power Supply" />
            </div>

            <footer className="footer">
                <p>&copy; 2024 Electricity Connection Management System</p>
            </footer>
        </div>
    );
};

export default Home;